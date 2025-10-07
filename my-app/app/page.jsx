import HeroSection from "@/components/hero";
import { Card, CardContent } from "@/components/ui/card";
import { featuresData, howItWorksData, statsData, testimonialsData } from "@/data/landing";
import Image from "next/image";


export default function home() {
  return(<div className="mt-40">
    <HeroSection/>

    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((statsData,index)=>(
            <div key={index} className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">{statsData.value}</div>
          <div className="text-gray-600">{statsData.label}</div>
           </div>
          ))}
        </div>
      </div>
    </section>
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Everything you need to manage your finance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature,index)=>(
            <Card key={index} className="p-6">
  <CardContent className="space-y-4 pt-4">
    {feature.icon}
    <h3 className="text-xl font-semibold">{feature.title}</h3>
    <p className="text-gray-600">{feature.description}</p>
  </CardContent>
</Card>
          ))}
        </div>
      </div>
    </section>
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorksData.map((step,index)=>(
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                 </div>
          ))}
        </div>
      </div>
    </section>
        <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our User's Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial,index)=>(
            <Card key={index} className="p-6">
  <CardContent className="pt-4">
    <div>
      <Image src={testimonial.image}
      alt={testimonial.name}
      width={40}
      height={40}
      className="rounded-full"/>
    </div>
    
  </CardContent>
</Card>
          ))}
        </div>
      </div>
    </section>
    
</div>
);
}