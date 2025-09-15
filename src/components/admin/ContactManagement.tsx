import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Eye, Check, X, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adminContactsAPI, AdminContact } from '@/services/adminAPI';

const ContactManagement = () => {
  const [contacts, setContacts] = useState<AdminContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<AdminContact | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await adminContactsAPI.getAllContacts();
      
      if (response.data) {
        setContacts(response.data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch contact forms",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Error fetching contacts:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch contact forms",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (contactId: string, newStatus: 'contacted' | 'uncontacted') => {
    try {
      const response = await adminContactsAPI.updateContactStatus(contactId, newStatus);
      
      if (response.success) {
        setContacts(contacts.map(contact => 
          contact._id === contactId 
            ? { 
                ...contact, 
                status: newStatus,
                contactedAt: newStatus === 'contacted' ? new Date().toISOString() : undefined,
                contactedBy: newStatus === 'contacted' ? localStorage.getItem('adminEmail') || undefined : undefined
              } 
            : contact
        ));

        toast({
          title: "Success",
          description: `Contact marked as ${newStatus}`,
        });
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to update contact status",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Error updating contact status:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update contact status",
        variant: "destructive",
      });
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusBadge = (status: string) => {
    if (status === 'contacted') {
      return <Badge className="bg-green-100 text-green-800">Contacted</Badge>;
    }
    return <Badge variant="outline" className="border-orange-200 text-orange-800">Uncontacted</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Contact Forms</h1>
          <p className="text-gray-300 mt-2">Manage and respond to contact form submissions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Contacts</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{contacts.length}</div>
          </CardContent>
        </Card>
        <Card className="glass border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Uncontacted</CardTitle>
            <Clock className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-400">
              {contacts.filter(c => c.status === 'uncontacted' || !c.status).length}
            </div>
          </CardContent>
        </Card>
        <Card className="glass border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Contacted</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              {contacts.filter(c => c.status === 'contacted').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass border border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Contact Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm bg-white/5 border-white/10 text-white placeholder-gray-400"
            />
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-300">Loading contacts...</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-gray-300">Name</TableHead>
                    <TableHead className="text-gray-300">Email</TableHead>
                    <TableHead className="text-gray-300">Company</TableHead>
                    <TableHead className="text-gray-300">Service</TableHead>
                    <TableHead className="text-gray-300">Budget</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Date</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact) => (
                    <TableRow key={contact._id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-medium text-white">{contact.name}</TableCell>
                      <TableCell className="text-gray-300">{contact.email}</TableCell>
                      <TableCell className="text-gray-300">{contact.company}</TableCell>
                      <TableCell className="text-gray-300">{contact.service}</TableCell>
                      <TableCell className="text-gray-300">{contact.budget}</TableCell>
                      <TableCell>{getStatusBadge(contact.status || 'uncontacted')}</TableCell>
                      <TableCell className="text-gray-300">{new Date(contact.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedContact(contact)}
                                className="border-white/20 text-gray-300 hover:bg-white/10"
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Contact Details</DialogTitle>
                              </DialogHeader>
                              {selectedContact && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium">Name</label>
                                      <p className="text-sm text-gray-600">{selectedContact.name}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Email</label>
                                      <p className="text-sm text-gray-600">{selectedContact.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Phone</label>
                                      <p className="text-sm text-gray-600">{selectedContact.phone}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Company</label>
                                      <p className="text-sm text-gray-600">{selectedContact.company}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Service</label>
                                      <p className="text-sm text-gray-600">{selectedContact.service}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Budget</label>
                                      <p className="text-sm text-gray-600">{selectedContact.budget}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Timeline</label>
                                      <p className="text-sm text-gray-600">{selectedContact.timeline}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Status</label>
                                      <div className="mt-1">{getStatusBadge(selectedContact.status || 'uncontacted')}</div>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Project Description</label>
                                    <p className="text-sm text-gray-600 mt-1 p-3 bg-gray-50 rounded">
                                      {selectedContact.projectDescription}
                                    </p>
                                  </div>
                                  {selectedContact.contactedAt && (
                                    <div className="text-xs text-gray-500">
                                      Contacted on {new Date(selectedContact.contactedAt).toLocaleDateString()} by {selectedContact.contactedBy}
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          {(contact.status === 'uncontacted' || !contact.status) ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusChange(contact._id, 'contacted')}
                              className="border-green-500/20 text-green-400 hover:bg-green-500/10"
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusChange(contact._id, 'uncontacted')}
                              className="border-orange-500/20 text-orange-400 hover:bg-orange-500/10"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredContacts.length === 0 && !loading && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-400">
                        No contacts found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactManagement;