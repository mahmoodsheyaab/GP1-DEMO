import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Message, Doctor } from '@/app/utils/mockData';
import { useAuth } from '@/app/contexts/AuthContext';
import { Send, MessageCircle, User } from 'lucide-react';
import { toast } from 'sonner';

export const MessagingPage: React.FC = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<(Doctor | { id: string; name: string; role: string })[]>([]);
  const [selectedContact, setSelectedContact] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadContacts();
  }, [user]);

  useEffect(() => {
    if (selectedContact) {
      loadMessages();
    }
  }, [selectedContact, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadContacts = () => {
    if (user?.role === 'patient') {
      // Patients see doctors
      const doctors: Doctor[] = JSON.parse(localStorage.getItem('doctors') || '[]');
      setContacts(doctors);
    } else if (user?.role === 'doctor') {
      // Doctors see their patients (from reports)
      const allReports = JSON.parse(localStorage.getItem('reports') || '[]');
      const myPatients = allReports
        .filter((r: any) => r.doctorId === user.id)
        .map((r: any) => ({ id: r.patientId, name: r.patientName, role: 'patient' }));
      
      // Remove duplicates
      const uniquePatients = myPatients.filter(
        (patient: any, index: number, self: any[]) => 
          index === self.findIndex((p) => p.id === patient.id)
      );
      setContacts(uniquePatients);
    }
  };

  const loadMessages = () => {
    const allMessages: Message[] = JSON.parse(localStorage.getItem('messages') || '[]');
    const conversationMessages = allMessages.filter(
      m => (m.senderId === user?.id && m.receiverId === selectedContact) ||
           (m.senderId === selectedContact && m.receiverId === user?.id)
    );
    // Sort by timestamp
    conversationMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    setMessages(conversationMessages);

    // Mark messages as read
    const updatedMessages = allMessages.map(m => {
      if (m.receiverId === user?.id && m.senderId === selectedContact && !m.read) {
        return { ...m, read: true };
      }
      return m;
    });
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) {
      return;
    }

    const contact = contacts.find(c => c.id === selectedContact);
    if (!contact) return;

    const allMessages: Message[] = JSON.parse(localStorage.getItem('messages') || '[]');
    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: user!.id,
      senderName: user!.name,
      receiverId: selectedContact,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    };

    allMessages.push(message);
    localStorage.setItem('messages', JSON.stringify(allMessages));
    
    setMessages([...messages, message]);
    setNewMessage('');
    toast.success('Message sent');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const selectedContactData = contacts.find(c => c.id === selectedContact);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Messaging</h2>
        <p className="text-gray-600">Direct communication between patients and doctors</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 h-[600px]">
        {/* Contacts List */}
        <Card>
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
            <CardDescription>
              {user?.role === 'patient' ? 'Your doctors' : 'Your patients'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[480px]">
              {contacts.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <MessageCircle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No contacts yet</p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {contacts.map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => setSelectedContact(contact.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        selectedContact === contact.id
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <Avatar>
                        <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{contact.name}</p>
                        {'specialization' in contact && (
                          <p className="text-xs text-gray-500">{contact.specialization}</p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Messages Area */}
        <Card className="md:col-span-2">
          {selectedContact ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {selectedContactData ? getInitials(selectedContactData.name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{selectedContactData?.name}</CardTitle>
                    {'specialization' in selectedContactData! && (
                      <CardDescription>{selectedContactData.specialization}</CardDescription>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px] p-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageCircle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                      <p className="text-gray-500">No messages yet</p>
                      <p className="text-sm text-gray-400">Start the conversation</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => {
                        const isOwnMessage = message.senderId === user?.id;
                        return (
                          <div
                            key={message.id}
                            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${
                                isOwnMessage
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-900'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                                }`}
                              >
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </ScrollArea>
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="h-full flex items-center justify-center">
              <div className="text-center">
                <User className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">Select a contact to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};
