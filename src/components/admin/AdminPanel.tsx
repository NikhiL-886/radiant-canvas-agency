import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import UserManagement from "./UserManagement";
import ContactManagement from "./ContactManagement";
import AdminAnalytics from "./AdminAnalytics";
import AdminSettings from "./AdminSettings";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and is admin
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      
      if (userData && (userData.admin === true || userData.Admin === true)) {
        setUser(userData);
      } else {
        console.log('User is not admin, redirecting to home');
        // Not an admin, redirect to home
        navigate('/');
      }
    } else {
      console.log('No user data found, redirecting to home');
      // Not logged in, redirect to home
      navigate('/');
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <UserManagement />;
      case 'contacts':
        return <ContactManagement />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        user={user}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Mobile header */}
        <div className="lg:hidden glass border-b border-white/10 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="text-white hover:bg-white/10"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
