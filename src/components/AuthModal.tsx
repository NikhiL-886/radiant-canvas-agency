import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getApiUrl, API_ENDPOINTS, apiRequest, ApiResponse } from "@/config/api";

const AuthModal = ({ open, onClose, onAuthSuccess }: { open: boolean; onClose: () => void; onAuthSuccess: (user: any) => void }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forget' | 'reset'>('login');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await apiRequest<{ token: string; user: any }>(API_ENDPOINTS.auth.login, {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      if (response.token && response.user) {
        // Normalize the admin field to lowercase
        const normalizedUser = {
          ...response.user,
          admin: response.user.Admin || response.user.admin || false
        };
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(normalizedUser));
        onAuthSuccess(normalizedUser);
        onClose();
      } else {
        setError(response.message || "Login failed");
      }
    } catch (error: any) {
      setError(error.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await apiRequest<{ token: string; user: any }>(API_ENDPOINTS.auth.register, {
        method: "POST",
        body: JSON.stringify({ username, email, password })
      });

      if (response.token && response.user) {
        // Normalize the admin field to lowercase
        const normalizedUser = {
          ...response.user,
          admin: response.user.Admin || response.user.admin || false
        };
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(normalizedUser));
        onAuthSuccess(normalizedUser);
        onClose();
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (error: any) {
      setError(error.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleForget = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await apiRequest(API_ENDPOINTS.auth.forgotPassword, {
        method: "POST",
        body: JSON.stringify({ email })
      });

      if (response.message) {
        alert(response.message);
        setMode('login');
      } else {
        setError(response.message || "Failed to send reset link");
      }
    } catch (error: any) {
      setError(error.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await apiRequest(API_ENDPOINTS.auth.resetPassword, {
        method: "POST",
        body: JSON.stringify({ token: resetToken, password: newPassword })
      });

      if (response.message) {
        alert(response.message);
        setMode('login');
      } else {
        setError(response.message || "Failed to reset password");
      }
    } catch (error: any) {
      setError(error.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md glass bg-white/30 backdrop-blur-lg border border-white/20 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {mode === 'login' && 'Login'}
            {mode === 'register' && 'Register'}
            {mode === 'forget' && 'Forgot Password'}
            {mode === 'reset' && 'Reset Password'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {mode === 'login' && (
            <>
              <Label>Email</Label>
              <Input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" />
              <Label>Password</Label>
              <Input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
              <Button className="w-full mt-2" onClick={handleLogin} disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
              <div className="flex justify-between mt-2 text-sm">
                <button type="button" className="text-blue-600" onClick={() => setMode('register')}>Register</button>
                <button type="button" className="text-blue-600" onClick={() => setMode('forget')}>Forgot Password?</button>
              </div>
            </>
          )}
          {mode === 'register' && (
            <>
              <Label>Username</Label>
              <Input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" />
              <Label>Email</Label>
              <Input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" />
              <Label>Password</Label>
              <Input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
              <Button className="w-full mt-2" onClick={handleRegister} disabled={loading}>{loading ? 'Registering...' : 'Register'}</Button>
              <div className="flex justify-between mt-2 text-sm">
                <button type="button" className="text-blue-600" onClick={() => setMode('login')}>Login</button>
              </div>
            </>
          )}
          {mode === 'forget' && (
            <>
              <Label>Email</Label>
              <Input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" />
              <Button className="w-full mt-2" onClick={handleForget} disabled={loading}>{loading ? 'Sending...' : 'Send Reset Link'}</Button>
              <div className="flex justify-between mt-2 text-sm">
                <button type="button" className="text-blue-600" onClick={() => setMode('login')}>Back to Login</button>
              </div>
            </>
          )}
          {mode === 'reset' && (
            <>
              <Label>Reset Token</Label>
              <Input value={resetToken} onChange={e => setResetToken(e.target.value)} type="text" placeholder="Reset Token" />
              <Label>New Password</Label>
              <Input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" placeholder="New Password" />
              <Button className="w-full mt-2" onClick={handleReset} disabled={loading}>{loading ? 'Resetting...' : 'Reset Password'}</Button>
              <div className="flex justify-between mt-2 text-sm">
                <button type="button" className="text-blue-600" onClick={() => setMode('login')}>Back to Login</button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
