
import { useState } from "react";
import BusinessForm from "../components/BusinessForm";
import BusinessCard from "../components/BusinessCard";
import { BusinessData } from "../types/business";

const Index = () => {
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBusinessSubmit = (data: BusinessData) => {
    setBusinessData(data);
  };

  const handleRegenerateHeadline = (newHeadline: string) => {
    if (businessData) {
      setBusinessData({
        ...businessData,
        headline: newHeadline
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!businessData ? (
            <div className="flex justify-center">
              <BusinessForm 
                onSubmit={handleBusinessSubmit} 
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </div>
          ) : (
            <div className="space-y-8">
              <BusinessCard 
                data={businessData} 
                onRegenerateHeadline={handleRegenerateHeadline}
              />
              
              {/* Back to form button */}
              <div className="text-center">
                <button
                  onClick={() => setBusinessData(null)}
                  className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                >
                  ← Analyze Another Business
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
