import { useState } from "react";
import { Button } from "@/components/ui/button"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Users, 
  DollarSign, 
  Calendar,
  ArrowRight,
  CheckCircle,
  Gift,
  Handshake
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GetInvolved = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("one-time");
  const { toast } = useToast();

  const donationAmounts = [25, 50, 100, 250, 500];

  const volunteerOpportunities = [
    {
      icon: Users,
      title: "Group Facilitator Assistant",
      description: "Support group therapy sessions and help create a welcoming environment for participants.",
      commitment: "4-6 hours/week",
      requirements: "Background check required"
    },
    {
      icon: Calendar,
      title: "Community Event Coordinator",
      description: "Help organize workshops, educational events, and community outreach programs.",
      commitment: "2-4 hours/week",
      requirements: "Event planning experience preferred"
    },
    {
      icon: Heart,
      title: "Crisis Support Volunteer",
      description: "Provide compassionate support through our crisis hotline after completing training.",
      commitment: "One 4-hour shift/week",
      requirements: "Crisis training provided"
    },
    {
      icon: Gift,
      title: "Resource Coordinator",
      description: "Help connect clients with community resources, housing assistance, and basic needs.",
      commitment: "3-5 hours/week", 
      requirements: "Organizational skills helpful"
    }
  ];

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = customAmount || donationAmount;
    if (!amount) {
      toast({
        title: "Amount Required",
        description: "Please select or enter a donation amount.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Thank You!",
      description: `Your ${donationType} donation of $${amount} will make a real difference in our community.`,
    });
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest in volunteering. We'll contact you within 2-3 business days.",
    });
  };

  return (
    <section id="get-involved" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
            Get Involved
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join our mission to provide accessible mental health care and support to our community. 
            Every contribution and volunteer hour makes a meaningful difference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Donation Section */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Support Our Mission
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Your donation directly supports individuals and families in need of mental health services, 
                community programs, and crisis intervention resources.
              </p>
            </div>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Make a Donation
                </CardTitle>
                <CardDescription>
                  Choose your contribution amount and frequency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDonationSubmit} className="space-y-6">
                  {/* Donation Type */}
                  <div className="space-y-2">
                    <Label>Donation Type</Label>
                    <Select value={donationType} onValueChange={setDonationType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-time">One-time donation</SelectItem>
                        <SelectItem value="monthly">Monthly recurring</SelectItem>
                        <SelectItem value="quarterly">Quarterly recurring</SelectItem>
                        <SelectItem value="annual">Annual recurring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Preset Amounts */}
                  <div className="space-y-2">
                    <Label>Select Amount</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {donationAmounts.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={donationAmount === amount.toString() ? "default" : "outline"}
                          onClick={() => {
                            setDonationAmount(amount.toString());
                            setCustomAmount("");
                          }}
                          className="h-12"
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="custom-amount">Or enter custom amount</Label>
                    <Input
                      id="custom-amount"
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setDonationAmount("");
                      }}
                    />
                  </div>

                  {/* Impact Statement */}
                  {(donationAmount || customAmount) && (
                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                      <p className="text-sm text-primary font-medium">
                        Your ${customAmount || donationAmount} donation could:
                      </p>
                      <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                        <li>• Provide 2-3 group therapy sessions for someone in need</li>
                        <li>• Support crisis intervention resources for families</li>
                        <li>• Help fund community mental health workshops</li>
                      </ul>
                    </div>
                  )}

                  <Button type="submit" className="w-full btn-hero">
                    Donate Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Volunteer Section */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <Handshake className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Volunteer With Us
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Share your time and talents to make a direct impact in the lives of individuals 
                and families seeking mental health support in our community.
              </p>
            </div>

            {/* Volunteer Opportunities */}
            <div className="space-y-4">
              {volunteerOpportunities.map((opportunity) => {
                const Icon = opportunity.icon;
                return (
                  <Card key={opportunity.title} className="card-elevated p-4 hover:scale-105 transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full flex-shrink-0">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-2">
                            {opportunity.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            {opportunity.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">
                              {opportunity.commitment}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {opportunity.requirements}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Volunteer Application */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Volunteer Application
                </CardTitle>
                <CardDescription>
                  Express your interest in volunteering with us
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="volunteer-name">Full Name</Label>
                      <Input id="volunteer-name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="volunteer-email">Email</Label>
                      <Input id="volunteer-email" type="email" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="volunteer-phone">Phone Number</Label>
                    <Input id="volunteer-phone" type="tel" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="volunteer-interest">Areas of Interest</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select volunteer opportunity" />
                      </SelectTrigger>
                      <SelectContent>
                        {volunteerOpportunities.map((opp) => (
                          <SelectItem key={opp.title} value={opp.title.toLowerCase()}>
                            {opp.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="volunteer-message">Tell us about yourself</Label>
                    <Textarea 
                      id="volunteer-message"
                      placeholder="Share your experience, availability, and why you'd like to volunteer with us..."
                      rows={4}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="volunteer-background" />
                    <Label htmlFor="volunteer-background" className="text-sm">
                      I understand that a background check may be required for certain volunteer positions
                    </Label>
                  </div>

                  <Button type="submit" className="w-full btn-hero">
                    Submit Application
                    <CheckCircle className="ml-2 h-4 w-4" />
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

export default GetInvolved;