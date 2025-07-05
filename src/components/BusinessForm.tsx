
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BusinessData } from "../types/business";
import { getBusinessData } from "../utils/api";
import { toast } from "@/hooks/use-toast";
import { MapPin, Building2, Loader2 } from "lucide-react";

interface BusinessFormProps {
  onSubmit: (data: BusinessData) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const BusinessForm = ({ onSubmit, isLoading, setIsLoading }: BusinessFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    location: ""
  });
  const [errors, setErrors] = useState<{ name?: string; location?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; location?: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Business name is required";
    }
    
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const businessData = await getBusinessData(formData.name, formData.location);
      onSubmit(businessData);
      toast({
        title: "Success!",
        description: "Business data loaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load business data. Please try again.",
        variant: "destructive",
      });
      console.error("Error fetching business data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Business Analysis
        </CardTitle>
        <p className="text-gray-600 mt-2">
          Enter your business details to get instant insights
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
              Business Name
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="businessName"
                type="text"
                placeholder="e.g., Cake & Co"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`pl-10 h-12 border-2 transition-colors ${
                  errors.name ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
                }`}
                disabled={isLoading}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">
              Location
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="location"
                type="text"
                placeholder="e.g., Mumbai"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className={`pl-10 h-12 border-2 transition-colors ${
                  errors.location ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
                }`}
                disabled={isLoading}
              />
            </div>
            {errors.location && (
              <p className="text-sm text-red-600 mt-1">{errors.location}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Business...
              </>
            ) : (
              "Get Business Insights"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BusinessForm;
