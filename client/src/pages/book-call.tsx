import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/footer";
import CalendarScheduler from "@/components/calendar-scheduler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function BookCall() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    selectedTimeSlot: "",
    goals: "",
    experience: "",
    eatingOut: "",
    typicalDay: "",
    drinks: "",
    emotionalEating: "",
    medications: "",
    contactMethod: ""
  });

  // Query to fetch available time slots
  const { data: availableSlots, isLoading: slotsLoading } = useQuery<Array<{value: string, label: string}>>({
    queryKey: ["/api/available-time-slots"],
    retry: false,
  });

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch("/api/consultation-requests", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to submit");
      }
      
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your consultation request has been submitted. I'll be in touch soon!",
      });
      
      // Refresh available slots
      queryClient.invalidateQueries({ queryKey: ["/api/available-time-slots"] });
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        selectedTimeSlot: "",
        goals: "",
        experience: "",
        eatingOut: "",
        typicalDay: "",
        drinks: "",
        emotionalEating: "",
        medications: "",
        contactMethod: ""
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Booking Error",
        description: error.message,
        variant: "destructive",
      });
      
      // Refresh available slots in case of conflict
      queryClient.invalidateQueries({ queryKey: ["/api/available-time-slots"] });
      
      console.error("Submission error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 pt-20">
      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Book Your Free Introductory Call
          </h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
            Ready to transform your relationship with food and achieve lasting results? Let's chat about your goals and see if my 1-on-1 nutrition coaching is the right fit for you.
          </p>
        </div>
      </section>
      {/* Booking Form Section */}
      <section className="pb-16">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-secondary">Let's Get Started</CardTitle>
              <p className="text-gray-600">This quick form helps me prepare for our conversation and make the most of your time.</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">Call Information</h3>
                <p className="text-sm text-blue-700 mb-1">
                  Calls are conducted via <strong>FaceTime</strong> (iPhone required) or <strong>WhatsApp video call</strong>.
                </p>
                <p className="text-xs text-blue-600">Allows me to call you from abroad with no extra charge.</p>
              </div>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                      className="mt-1"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                      className="mt-1"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="mt-1"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="mt-1"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">How would you prefer to be contacted? *</Label>
                  <Select onValueChange={(value) => handleInputChange("contactMethod", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose your preferred contact method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facetime">FaceTime (iPhone required)</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Calendar Time Slot Selection */}
                <CalendarScheduler
                  availableSlots={availableSlots || []}
                  selectedSlot={formData.selectedTimeSlot}
                  onSlotSelect={(slot) => handleInputChange("selectedTimeSlot", slot)}
                  userDetails={{
                    name: `${formData.firstName} ${formData.lastName}`.trim(),
                    email: formData.email
                  }}
                />

                {/* Goals and Background */}
                <div>
                  <Label htmlFor="goals" className="text-sm font-medium text-gray-700">What are your main health and nutrition goals? *</Label>
                  <Textarea
                    id="goals"
                    value={formData.goals}
                    onChange={(e) => handleInputChange("goals", e.target.value)}
                    required
                    className="mt-1"
                    rows={3}
                    placeholder="e.g., lose weight, gain muscle, improve energy, develop better eating habits..."
                  />
                </div>

                <div>
                  <Label htmlFor="experience" className="text-sm font-medium text-gray-700">Previous experience with nutrition coaching or dieting?</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange("experience", e.target.value)}
                    className="mt-1"
                    rows={2}
                    placeholder="Tell me about any previous attempts, what worked, what didn't..."
                  />
                </div>

                <div>
                  <Label htmlFor="eatingOut" className="text-sm font-medium text-gray-700">On average, how many times per week do you eat meals away from home — including restaurants, takeout, or social events like birthdays and get-togethers?</Label>
                  <Input
                    id="eatingOut"
                    value={formData.eatingOut}
                    onChange={(e) => handleInputChange("eatingOut", e.target.value)}
                    className="mt-1"
                    placeholder="e.g., 2-3 times, rarely, daily..."
                  />
                </div>

                <div>
                  <Label htmlFor="typicalDay" className="text-sm font-medium text-gray-700">What does a typical day of eating look like?</Label>
                  <Textarea
                    id="typicalDay"
                    value={formData.typicalDay}
                    onChange={(e) => handleInputChange("typicalDay", e.target.value)}
                    className="mt-1"
                    rows={3}
                    placeholder="Describe your usual breakfast, lunch, dinner, and any snacks..."
                  />
                </div>

                <div>
                  <Label htmlFor="drinks" className="text-sm font-medium text-gray-700">Do you drink soda, alcohol, lattes, or other caloric drinks?</Label>
                  <Textarea
                    id="drinks"
                    value={formData.drinks}
                    onChange={(e) => handleInputChange("drinks", e.target.value)}
                    className="mt-1"
                    rows={2}
                    placeholder="Type and frequency of beverages you regularly consume..."
                  />
                </div>

                <div>
                  <Label htmlFor="emotionalEating" className="text-sm font-medium text-gray-700">Do you eat for any other reason than being hungry?</Label>
                  <Textarea
                    id="emotionalEating"
                    value={formData.emotionalEating}
                    onChange={(e) => handleInputChange("emotionalEating", e.target.value)}
                    className="mt-1"
                    rows={2}
                    placeholder="e.g., stress, boredom, social situations, celebrations..."
                  />
                </div>

                <div>
                  <Label htmlFor="medications" className="text-sm font-medium text-gray-700">Are you on any medications? </Label>
                  <Textarea
                    id="medications"
                    value={formData.medications}
                    onChange={(e) => handleInputChange("medications", e.target.value)}
                    className="mt-1"
                    rows={2}
                    placeholder="List any medications and note if you're aware of weight-related effects..."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={submitMutation.isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-medium"
                >
                  {submitMutation.isPending ? "Submitting..." : "Submit & Schedule Your Free Call"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* What to Expect Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary mb-8 text-center">What to Expect on Your Call</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get to Know You</h3>
              <p className="text-gray-600">We'll discuss your goals, challenges, and what you're looking for in a nutrition coach.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Explore Solutions</h3>
              <p className="text-gray-600">I'll share how my coaching approach can help you overcome your specific challenges.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Determine Fit</h3>
              <p className="text-gray-600">We'll see if we're a good match and discuss next steps if you'd like to move forward.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 mb-4">
              <strong>Duration:</strong> 30-45 minutes | <strong>Cost:</strong> Completely free, no obligation
            </p>
            <p className="text-gray-600">
              This call is about you and your goals. There's no pressure, just an honest conversation about how I can help you succeed.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}