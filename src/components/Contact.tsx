import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    urgency: "",
    message: ""
  });
  
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      primary: "703-876-8480",
      secondary: "Main office line",
      action: "tel:703-876-8480"
    },
    {
      icon: Mail,
      title: "Email",
      primary: "info@insteppc.com",
      secondary: "General inquiries",
      action: "mailto:info@insteppc.com"
    },
    {
      icon: MapPin,
      title: "Location",
      primary: "Northern Virginia",
      secondary: "Serving Arlington, Alexandria, Fairfax",
      action: null
    },
    {
      icon: Clock,
      title: "Hours",
      primary: "Mon-Fri: 8AM-7PM",
      secondary: "Weekend & evening appointments available",
      action: null
    }
  ];

  const services = [
    "Individual Therapy",
    "Group Therapy", 
    "Family Therapy",
    "DBT Skills Groups",
    "Reentry Support Program",
    "Domestic Violence Support",
    "Parenting Skills Program",
    "Psychological Testing",
    "Community Workshops",
    "Crisis Support"
  ];

  const urgencyLevels = [
    { value: "routine", label: "Routine (1-2 weeks)", color: "success" },
    { value: "urgent", label: "Urgent (within 1 week)", color: "warning" },
    { value: "crisis", label: "Crisis (immediate attention)", color: "destructive" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (formData.urgency === "crisis") {
      toast({
        title: "Crisis Support",
        description: "For immediate crisis support, please call 988 or visit your nearest emergency room.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll respond within 24-48 hours.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      urgency: "",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
            Contact Us
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to take the first step? We're here to answer your questions and help you 
            find the right support for your mental health journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                Get in Touch
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our compassionate team is ready to support you. Choose the contact method 
                that feels most comfortable for you.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((contact) => {
                const Icon = contact.icon;
                return (
                  <Card key={contact.title} className="card-elevated p-4 hover:scale-105 transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">
                            {contact.title}
                          </h4>
                          {contact.action ? (
                            <a 
                              href={contact.action}
                              className="text-primary hover:underline font-medium"
                            >
                              {contact.primary}
                            </a>
                          ) : (
                            <div className="text-primary font-medium">
                              {contact.primary}
                            </div>
                          )}
                          <p className="text-sm text-muted-foreground">
                            {contact.secondary}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Crisis Alert */}
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-destructive mb-2">
                      Crisis Support Available 24/7
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      If you're experiencing a mental health crisis or thoughts of self-harm, 
                      immediate help is available.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="destructive" size="sm" asChild>
                        <a href="tel:988">Call 988 - Crisis Hotline</a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href="tel:911">Call 911 - Emergency</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Send Us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24-48 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Full Name *</Label>
                      <Input 
                        id="contact-name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email *</Label>
                      <Input 
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required 
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone Number</Label>
                    <Input 
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>

                  {/* Service Interest */}
                  <div className="space-y-2">
                    <Label>Service Interest</Label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service you're interested in" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service.toLowerCase()}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Urgency Level */}
                  <div className="space-y-2">
                    <Label>How soon do you need support?</Label>
                    <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.urgency && (
                      <Badge 
                        variant={
                          formData.urgency === "crisis" ? "destructive" :
                          formData.urgency === "urgent" ? "secondary" : "outline"
                        }
                        className="mt-2"
                      >
                        {urgencyLevels.find(l => l.value === formData.urgency)?.label}
                      </Badge>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message *</Label>
                    <Textarea 
                      id="contact-message"
                      placeholder="Tell us about your situation, questions, or how we can help you..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                    />
                  </div>

                  {/* Privacy Note */}
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      <CheckCircle className="inline h-3 w-3 mr-1" />
                      Your privacy is important to us. This form is secure and confidential. 
                      We will never share your information without your consent.
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-hero"
                    disabled={formData.urgency === "crisis"}
                  >
                    {formData.urgency === "crisis" ? "Please Call Crisis Line" : "Send Message"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;