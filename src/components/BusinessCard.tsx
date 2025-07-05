
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BusinessData } from "../types/business";
import { regenerateHeadline } from "../utils/api";
import { toast } from "@/hooks/use-toast";
import { Star, MessageSquare, Sparkles, MapPin, Building2, Loader2 } from "lucide-react";

interface BusinessCardProps {
  data: BusinessData;
  onRegenerateHeadline: (newHeadline: string) => void;
}

const BusinessCard = ({ data, onRegenerateHeadline }: BusinessCardProps) => {
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerateHeadline = async () => {
    setIsRegenerating(true);
    
    try {
      const newHeadline = await regenerateHeadline(data.name, data.location);
      onRegenerateHeadline(newHeadline);
      toast({
        title: "Headline Updated!",
        description: "New AI-generated headline created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to regenerate headline. Please try again.",
        variant: "destructive",
      });
      console.error("Error regenerating headline:", error);
    } finally {
      setIsRegenerating(false);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-5 h-5 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="animate-in fade-in-50 duration-500">
      <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white pb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">{data.name}</CardTitle>
              <div className="flex items-center mt-1 text-blue-100">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{data.location}</span>
              </div>
            </div>
          </div>
          
          <Badge variant="secondary" className="w-fit bg-white/20 text-white border-white/30 hover:bg-white/30">
            Business Insights Dashboard
          </Badge>
        </CardHeader>

        <CardContent className="p-8 space-y-8">
          {/* Rating and Reviews Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
              <div className="flex items-center space-x-2 mb-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Google Rating</h3>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900">{data.rating}</span>
                <div className="flex space-x-1">
                  {renderStars(data.rating)}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-2 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Total Reviews</h3>
              </div>
              
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-900">{data.reviews}</span>
                <span className="text-gray-600">reviews</span>
              </div>
            </div>
          </div>

          {/* SEO Headline Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">AI-Generated SEO Headline</h3>
              </div>
              
              <Button
                onClick={handleRegenerateHeadline}
                disabled={isRegenerating}
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                {isRegenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Regenerating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Regenerate
                  </>
                )}
              </Button>
            </div>
            
            <blockquote className="text-lg font-medium text-gray-800 italic leading-relaxed">
              "{data.headline}"
            </blockquote>
          </div>

          {/* Additional Insights */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-green-700">Rating Status</div>
                <div className="text-gray-600">
                  {data.rating >= 4.5 ? "Excellent" : data.rating >= 4.0 ? "Very Good" : data.rating >= 3.5 ? "Good" : "Needs Improvement"}
                </div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-green-700">Review Volume</div>
                <div className="text-gray-600">
                  {data.reviews >= 100 ? "High" : data.reviews >= 50 ? "Medium" : "Growing"}
                </div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-green-700">SEO Potential</div>
                <div className="text-gray-600">Optimized</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessCard;
