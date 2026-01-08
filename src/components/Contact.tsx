import { SmartLink } from "@/components/SmartLink";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useContent } from "@/context/ContentContext";
import { getIconByName } from "@/lib/icon-map";

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
  const {
    content: { contact },
  } = useContent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: contact.formValidation.missingTitle,
        description: contact.formValidation.missingDescription,
        variant: "destructive"
      });
      return;
    }
    if (formData.urgency === "crisis") {
      toast({
        title: contact.formValidation.crisisTitle,
        description: contact.formValidation.crisisDescription,
        variant: "destructive"
      });
      return;
    }
    // Submit to WordPress REST API
    try {
  const endpoint = "/wp-json/instep/v1/contact-request";
  const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message || "Submission failed");
      }
      toast({
        title: contact.formSuccess.title,
        description: contact.formSuccess.description,
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        urgency: "",
        message: ""
      });
    } catch (err: any) {
      toast({
        title: "Submission failed",
        description: err?.message || "Unable to send your request. Please try again later.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">{contact.heading}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {contact.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">{contact.introHeading}</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">{contact.introDescription}</p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contact.contactMethods.map((method) => {
                const Icon = getIconByName(method.icon);
                return (
                  <Card key={method.title} className="card-elevated p-4 hover:scale-105 transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full flex-shrink-0">
                          {Icon ? <Icon className="h-6 w-6 text-primary" /> : null}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">
                            {method.title}
                          </h4>
                          {method.action ? (
                            <SmartLink 
                              href={method.action}
                              className="text-primary hover:underline font-medium"
                            >
                              {method.primary}
                            </SmartLink>
                          ) : (
                            <div className="text-primary font-medium">
                              {method.primary}
                            </div>
                          )}
                          <p className="text-sm text-muted-foreground">
                            {method.secondary}
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
                    <h4 className="font-semibold text-destructive mb-2">{contact.crisis.heading}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{contact.crisis.description}</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="destructive" size="sm" asChild>
                        <SmartLink href={contact.crisis.primaryCta.url || "tel:988"}>{contact.crisis.primaryCta.label}</SmartLink>
                      </Button>
                      {contact.crisis.secondaryCta ? (
                        <Button variant="outline" size="sm" asChild>
                          <SmartLink href={contact.crisis.secondaryCta.url || "tel:911"}>
                            {contact.crisis.secondaryCta.label}
                          </SmartLink>
                        </Button>
                      ) : null}
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
                      {contact.services.map((service) => (
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
                      {contact.urgencyLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formData.urgency && (
                    <Badge 
                      variant={(() => {
                        const color = contact.urgencyLevels.find((l) => l.value === formData.urgency)?.color;
                        return ["default", "destructive", "outline", "secondary"].includes(color) ? color : "outline";
                      })()}
                      className="mt-2"
                    >
                      {contact.urgencyLevels.find((l) => l.value === formData.urgency)?.label}
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
                      {contact.privacyNote}
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-hero"
                    disabled={formData.urgency === "crisis"}
                  >
                    {formData.urgency === "crisis" ? contact.crisis.primaryCta.label : "Send Message"}
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
