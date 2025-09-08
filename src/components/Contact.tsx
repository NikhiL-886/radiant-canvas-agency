import React from 'react'
import { Card, CardContent } from './ui/card'
import { Mail, Phone, MapPin } from 'lucide-react';

function Contact() {
    const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "samtech.digital.work@gmail.com",
      action: "mailto:samtech.digital.work@gmail.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    // {
    //   icon: MapPin,
    //   title: "Visit Us",
    //   content: "123 Tech Street, Digital City, DC 12345",
    //   action: "#"
    // }
  ];

  return (
    <div className='grid grid-cols-2'>
        {contactInfo.map((info, index) => (
            <Card 
                key={info.title}
                className="glass border-border/50 hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
            >
                <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-accent/20 rounded-lg flex flex-row items-center justify-center">
                        <info.icon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                        <h4 className="font-semibold mb-1">{info.title}</h4>
                        <a 
                            href={info.action}
                            className="text-foreground/70 hover:text-accent transition-colors"
                        >
                            {info.content}
                        </a>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
  )
}

export default Contact