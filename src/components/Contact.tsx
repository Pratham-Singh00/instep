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
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    phone: "",
    clientName: "",
    clientAge: "",
    clientGrade: "",
    clientSchool: "",
    inquiryReasons: [] as string[],
    referralSource: "",
    message: ""
  });

  const { toast } = useToast();
  const {
    content: { contact },
  } = useContent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      });
      return;
    }

    if (formData.email !== formData.confirmEmail) {
      toast({
        title: "Email Mismatch",
        description: "Please check that your email addresses match.",
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
        firstName: "",
        lastName: "",
        email: "",
        confirmEmail: "",
        phone: "",
        clientName: "",
        clientAge: "",
        clientGrade: "",
        clientSchool: "",
        inquiryReasons: [],
        referralSource: "",
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

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (reason: string, checked: boolean) => {
    setFormData(prev => {
      const current = prev.inquiryReasons || [];
      if (checked) {
        return { ...prev, inquiryReasons: [...current, reason] };
      } else {
        return { ...prev, inquiryReasons: current.filter(r => r !== reason) };
      }
    });
  };

  const inquiryOptions = [
    "Individual therapy",
    "Group Therapy",
    "Psychoeducational Testing",
    "Parent Coaching",
    "Other"
  ];

  const referralOptions = [
    "None",
    "Doctor",
    "School",
    "Friend/Family",
    "Online Search",
    "Other"
  ];

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




          </div>

          {/* Contact Form */}
          <div id="contact-form">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Contact Form
                </CardTitle>
                <CardDescription>
                  {" "}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div className="space-y-2">
                      <Label htmlFor="confirm-email">Confirm Email *</Label>
                      <Input
                        id="confirm-email"
                        type="email"
                        value={formData.confirmEmail}
                        onChange={(e) => handleInputChange("confirmEmail", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Phone + Client Info Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone">Phone Number *</Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientName">Client Name *</Label>
                      <Input
                        id="clientName"
                        value={formData.clientName}
                        onChange={(e) => handleInputChange("clientName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientAge">Client's Age *</Label>
                      <Input
                        id="clientAge"
                        value={formData.clientAge}
                        onChange={(e) => handleInputChange("clientAge", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Client Info Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientGrade">Client Grade (enter N/A if inapplicable)</Label>
                      <Input
                        id="clientGrade"
                        value={formData.clientGrade}
                        onChange={(e) => handleInputChange("clientGrade", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientSchool">Client School (enter N/A if inapplicable)</Label>
                      <Input
                        id="clientSchool"
                        value={formData.clientSchool}
                        onChange={(e) => handleInputChange("clientSchool", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Inquiry Reasons */}
                  <div className="space-y-3">
                    <Label className="text-secondary-foreground font-semibold">Reason for Inquiry (check all that apply) <span className="text-destructive">(Required)</span></Label>
                    <div className="flex flex-wrap gap-4">
                      {inquiryOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`reason-${option}`}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            checked={formData.inquiryReasons.includes(option)}
                            onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                          />
                          <Label htmlFor={`reason-${option}`} className="font-normal">{option}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Referral Source */}
                  <div className="space-y-2">
                    <Label>Referral Source</Label>
                    <Select value={formData.referralSource} onValueChange={(value) => handleInputChange("referralSource", value)}>
                      <SelectTrigger className="bg-blue-50/50 border-blue-200">
                        <SelectValue placeholder="Select Source" />
                      </SelectTrigger>
                      <SelectContent>
                        {referralOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>


                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="contact-message" className="font-semibold">Reason for Reaching Out: <span className="text-destructive">(Required)</span></Label>
                    <Textarea
                      id="contact-message"
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
                  >
                    Send Message
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
