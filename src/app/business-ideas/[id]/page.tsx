"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Download, Share2 } from "lucide-react";

// Mock data for business ideas
const businessIdeas = [
  {
    id: "1",
    title: "Sustainable Packaging Service",
    category: "Small",
    description: "Offer eco-friendly packaging solutions for small businesses looking to reduce their environmental impact.",
    investment: "$5,000 - $15,000",
    difficulty: "Medium",
    overview: `
      # Sustainable Packaging Service

      ## Business Overview

      The Sustainable Packaging Service provides eco-friendly packaging solutions for small businesses looking to reduce their environmental impact. This business addresses the growing consumer demand for sustainable products and helps companies transition away from traditional plastic packaging.

      ## Market Opportunity

      - The global green packaging market is projected to reach $237.8 billion by 2024, growing at a CAGR of 5.7%.
      - 73% of consumers are willing to pay more for sustainable packaging.
      - Small businesses often lack the resources and knowledge to source sustainable packaging solutions.

      ## Business Model

      ### Revenue Streams
      - Packaging product sales (biodegradable containers, compostable mailers, etc.)
      - Packaging design and customization services
      - Consulting services for sustainable packaging transitions
      - Subscription boxes for regular packaging needs

      ### Target Customers
      - Small e-commerce businesses
      - Local food service businesses
      - Retail shops
      - Beauty and cosmetic brands
      - Subscription box companies

      ## Implementation Plan

      ### Phase 1: Setup (Months 1-3)
      - Research and source sustainable packaging suppliers
      - Develop website and e-commerce platform
      - Create initial product catalog
      - Establish logistics and fulfillment processes

      ### Phase 2: Launch (Months 4-6)
      - Begin marketing to local businesses
      - Offer free consultations to build client base
      - Develop customization capabilities
      - Establish partnerships with local eco-friendly businesses

      ### Phase 3: Growth (Months 7-12)
      - Expand product offerings
      - Develop subscription service
      - Create educational content about sustainable packaging
      - Explore white-labeling opportunities

      ## Financial Projections

      ### Startup Costs
      - Inventory: $3,000 - $8,000
      - Website and e-commerce platform: $1,000 - $3,000
      - Marketing and branding: $500 - $2,000
      - Legal and administrative: $500 - $2,000
      - Total: $5,000 - $15,000

      ### Monthly Operating Costs
      - Inventory replenishment: $1,500 - $3,000
      - Fulfillment and shipping: $500 - $1,000
      - Marketing: $300 - $800
      - Website maintenance: $50 - $100
      - Miscellaneous: $200 - $500
      - Total: $2,550 - $5,400

      ### Revenue Projections
      - Month 6: $3,000 - $6,000
      - Month 12: $8,000 - $15,000
      - Year 2: $120,000 - $200,000

      ## Competitive Advantage

      - Focus on small businesses that are underserved by larger packaging companies
      - Personalized consulting services to help businesses transition to sustainable options
      - Curated selection of high-quality, truly sustainable products
      - Educational component to help businesses market their sustainable choices

      ## Risks and Challenges

      - Higher costs of sustainable materials compared to traditional packaging
      - Supply chain disruptions for eco-friendly materials
      - Greenwashing from competitors with less sustainable options
      - Educating customers about the true value of sustainable packaging

      ## Conclusion

      The Sustainable Packaging Service offers an opportunity to build a profitable business while making a positive environmental impact. With relatively low startup costs and growing market demand, this business idea has strong potential for success and scalability.
    `,
    marketAnalysis: `
      # Market Analysis

      ## Industry Overview

      The sustainable packaging industry is experiencing rapid growth as consumers and businesses increasingly prioritize environmental responsibility. This shift is driven by growing awareness of plastic pollution, climate change, and resource depletion.

      ## Market Size and Growth

      - The global sustainable packaging market was valued at $89.1 billion in 2020 and is projected to reach $237.8 billion by 2024.
      - North America accounts for approximately 28% of the global market.
      - The market is growing at a CAGR of 5.7%, significantly faster than traditional packaging.

      ## Consumer Trends

      - 73% of consumers are willing to pay more for sustainable packaging.
      - 78% of consumers between the ages of 18-34 are willing to change their purchasing habits to reduce environmental impact.
      - 70% of consumers would be more likely to purchase from a brand that uses sustainable packaging.
      - The COVID-19 pandemic has accelerated e-commerce growth, increasing demand for sustainable shipping materials.

      ## Competitive Landscape

      ### Major Players
      - EcoEnclose - Offers a wide range of sustainable shipping supplies
      - noissue - Specializes in custom, compostable packaging
      - Packlane - Provides custom eco-friendly boxes and packaging

      ### Small Business Solutions
      - Limited options specifically targeting small businesses
      - Gap in personalized consulting services for sustainable transitions
      - Few companies offering small minimum order quantities

      ## Target Market Segments

      ### E-commerce Businesses
      - Rapidly growing segment with high packaging needs
      - Increasing pressure from consumers for sustainable shipping
      - Often lack knowledge about sustainable options

      ### Food Service Businesses
      - Growing demand for takeout and delivery services
      - Increasing regulations on single-use plastics
      - Consumer preference for eco-friendly food packaging

      ### Beauty and Cosmetic Brands
      - Industry shift toward sustainability
      - Premium packaging requirements
      - High potential for brand differentiation through packaging

      ### Subscription Box Companies
      - Regular, predictable packaging needs
      - Brand identity closely tied to unboxing experience
      - Typically aligned with sustainability values

      ## Market Entry Strategy

      ### Geographic Focus
      - Initial focus on urban areas with high concentration of small businesses
      - Target regions with strong environmental regulations
      - Expand to nationwide shipping capabilities

      ### Differentiation Strategy
      - Specialized knowledge and consulting services
      - Curated selection of truly sustainable options
      - Educational resources and marketing support
      - Low minimum order quantities

      ## Market Challenges

      - Price sensitivity among small businesses
      - Confusion about sustainability claims and certifications
      - Supply chain limitations for certain sustainable materials
      - Competition from larger packaging companies expanding into sustainable options

      ## Market Opportunities

      - Growing regulatory pressure on plastic packaging
      - Increasing consumer demand for sustainable brands
      - Limited options for small-batch, customized sustainable packaging
      - Potential for partnerships with eco-friendly product businesses

      ## Conclusion

      The sustainable packaging market presents a significant opportunity for a specialized service targeting small businesses. With strong growth projections, increasing consumer demand, and limited competition in the small business segment, there is a clear market gap that the Sustainable Packaging Service can fill.
    `,
    financialPlan: `
      # Financial Plan

      ## Startup Costs

      ### Initial Inventory ($3,000 - $8,000)
      - Packaging materials (various sizes and types): $2,000 - $5,000
      - Sample kits for potential clients: $500 - $1,500
      - Custom packaging materials: $500 - $1,500

      ### Website and E-commerce Platform ($1,000 - $3,000)
      - Website development: $800 - $2,000
      - E-commerce functionality: $200 - $800
      - Payment processing setup: $0 - $200

      ### Marketing and Branding ($500 - $2,000)
      - Logo and brand identity: $300 - $800
      - Initial marketing materials: $100 - $600
      - Social media setup: $100 - $600

      ### Legal and Administrative ($500 - $2,000)
      - Business registration: $100 - $500
      - Licenses and permits: $100 - $500
      - Insurance: $300 - $1,000

      ### Total Startup Costs: $5,000 - $15,000

      ## Monthly Operating Expenses

      ### Inventory Replenishment ($1,500 - $3,000)
      - Regular stock replenishment: $1,200 - $2,500
      - New product testing: $300 - $500

      ### Fulfillment and Shipping ($500 - $1,000)
      - Warehouse/storage space: $200 - $500
      - Shipping costs: $200 - $400
      - Packaging materials: $100 - $100

      ### Marketing ($300 - $800)
      - Digital advertising: $150 - $400
      - Content creation: $100 - $200
      - Email marketing: $50 - $200

      ### Website Maintenance ($50 - $100)
      - Hosting and domain: $20 - $40
      - Software subscriptions: $30 - $60

      ### Miscellaneous ($200 - $500)
      - Utilities: $50 - $100
      - Office supplies: $50 - $100
      - Professional services: $100 - $300

      ### Total Monthly Operating Expenses: $2,550 - $5,400

      ## Revenue Projections

      ### First Year (Monthly)
      - Months 1-3: $500 - $1,500 (setup phase)
      - Months 4-6: $3,000 - $6,000 (launch phase)
      - Months 7-9: $5,000 - $10,000 (growth phase)
      - Months 10-12: $8,000 - $15,000 (established phase)

      ### First Year Total: $49,500 - $97,500

      ### Second Year
      - Monthly average: $10,000 - $16,667
      - Annual total: $120,000 - $200,000

      ### Revenue Breakdown by Service
      - Packaging product sales: 60%
      - Custom packaging design: 20%
      - Consulting services: 15%
      - Subscription services: 5%

      ## Profitability Analysis

      ### Break-Even Analysis
      - Monthly fixed costs: $1,050 - $2,400
      - Average profit margin: 40%
      - Break-even revenue: $2,625 - $6,000
      - Expected break-even point: Month 5-6

      ### Profit Margins
      - Gross profit margin: 40-50%
      - Net profit margin (Year 1): 10-15%
      - Net profit margin (Year 2): 15-25%

      ### First Year Profit Projection
      - Total revenue: $49,500 - $97,500
      - Total expenses: $35,600 - $79,800
      - Net profit: $4,950 - $14,625 (10-15%)

      ## Funding Requirements

      ### Initial Investment
      - Startup costs: $5,000 - $15,000
      - Operating capital (3 months): $7,650 - $16,200
      - Total initial investment: $12,650 - $31,200

      ### Funding Sources
      - Personal investment: 50-70%
      - Friends and family: 0-30%
      - Small business loans: 0-50%

      ## Financial Milestones

      - Month 6: Break-even point
      - Month 12: Positive cash flow
      - Month 18: Recoup initial investment
      - Year 2: Achieve 15-25% net profit margin

      ## Exit Strategy Options

      - Continued operation as a profitable small business
      - Expansion into additional markets or services
      - Acquisition by larger packaging or sustainability company
      - Partnership with complementary eco-friendly business

      ## Conclusion

      The Sustainable Packaging Service presents a financially viable business opportunity with relatively low startup costs and strong profit potential. With careful management of expenses and a focus on high-margin services, the business can achieve profitability within the first year and substantial growth in subsequent years.
    `,
  },
  {
    id: "2",
    title: "Virtual Event Planning",
    category: "Small",
    description: "Help businesses plan and execute virtual events, conferences, and team-building activities.",
    investment: "$2,000 - $10,000",
    difficulty: "Low",
    overview: "Sample overview content",
    marketAnalysis: "Sample market analysis content",
    financialPlan: "Sample financial plan content",
  },
];

export default function BusinessIdeaPage() {
  const params = useParams();
  const id = params.id as string;
  const businessIdea = businessIdeas.find((idea) => idea.id === id) || businessIdeas[0];

  return (
    <MainLayout>
      <div className="container px-4 py-8 md:px-6">
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link href="/business-ideas">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Business Ideas
            </Link>
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{businessIdea.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                    businessIdea.category === "Small"
                      ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : businessIdea.category === "Medium"
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                  }`}
                >
                  {businessIdea.category}
                </span>
                <span className="text-muted-foreground">Investment: {businessIdea.investment}</span>
                <span className="text-muted-foreground">Difficulty: {businessIdea.difficulty}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Business Overview</TabsTrigger>
            <TabsTrigger value="market">Market Analysis</TabsTrigger>
            <TabsTrigger value="financial">Financial Plan</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <article
                  className="prose prose-neutral dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: businessIdea.overview
                      .replace(/^#{1}\s+(.+)$/gm, "<h1>$1</h1>")
                      .replace(/^#{2}\s+(.+)$/gm, "<h2>$1</h2>")
                      .replace(/^#{3}\s+(.+)$/gm, "<h3>$1</h3>")
                      .replace(/^#{4}\s+(.+)$/gm, "<h4>$1</h4>")
                      .replace(/^#{5}\s+(.+)$/gm, "<h5>$1</h5>")
                      .replace(/^#{6}\s+(.+)$/gm, "<h6>$1</h6>")
                      .replace(/^\s*-\s+(.+)$/gm, "<li>$1</li>")
                      .replace(/<li>(.+)<\/li>/g, "<ul><li>$1</li></ul>")
                      .replace(/<\/ul>\s*<ul>/g, "")
                      .replace(/\n\n/g, "</p><p>")
                      .replace(/\n/g, "<br>"),
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="market" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <article
                  className="prose prose-neutral dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: businessIdea.marketAnalysis
                      .replace(/^#{1}\s+(.+)$/gm, "<h1>$1</h1>")
                      .replace(/^#{2}\s+(.+)$/gm, "<h2>$1</h2>")
                      .replace(/^#{3}\s+(.+)$/gm, "<h3>$1</h3>")
                      .replace(/^#{4}\s+(.+)$/gm, "<h4>$1</h4>")
                      .replace(/^#{5}\s+(.+)$/gm, "<h5>$1</h5>")
                      .replace(/^#{6}\s+(.+)$/gm, "<h6>$1</h6>")
                      .replace(/^\s*-\s+(.+)$/gm, "<li>$1</li>")
                      .replace(/<li>(.+)<\/li>/g, "<ul><li>$1</li></ul>")
                      .replace(/<\/ul>\s*<ul>/g, "")
                      .replace(/\n\n/g, "</p><p>")
                      .replace(/\n/g, "<br>"),
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="financial" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <article
                  className="prose prose-neutral dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: businessIdea.financialPlan
                      .replace(/^#{1}\s+(.+)$/gm, "<h1>$1</h1>")
                      .replace(/^#{2}\s+(.+)$/gm, "<h2>$1</h2>")
                      .replace(/^#{3}\s+(.+)$/gm, "<h3>$1</h3>")
                      .replace(/^#{4}\s+(.+)$/gm, "<h4>$1</h4>")
                      .replace(/^#{5}\s+(.+)$/gm, "<h5>$1</h5>")
                      .replace(/^#{6}\s+(.+)$/gm, "<h6>$1</h6>")
                      .replace(/^\s*-\s+(.+)$/gm, "<li>$1</li>")
                      .replace(/<li>(.+)<\/li>/g, "<ul><li>$1</li></ul>")
                      .replace(/<\/ul>\s*<ul>/g, "")
                      .replace(/\n\n/g, "</p><p>")
                      .replace(/\n/g, "<br>"),
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Ready to Start This Business?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Get access to the complete business plan, including detailed implementation steps, marketing strategies, and financial projections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-primary text-primary-foreground">
                  <Link href="/pricing">Unlock This Business Plan</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/pricing">View All Pricing Options</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
