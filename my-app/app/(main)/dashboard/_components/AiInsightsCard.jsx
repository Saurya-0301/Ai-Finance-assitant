"use client";

import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import { generateAiInsights } from "@/actions/ai";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function AiInsightsCard() {
  const { fn: loadInsights, data, loading } = useFetch(generateAiInsights);

  useEffect(() => {
    loadInsights();
  }, []);

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-500" />
          AI Spending Insights
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading && <p className="text-sm text-muted-foreground">Analyzing…</p>}

        {data?.insights && (
          <ul className="space-y-2">
            {data.insights.map((insight, i) => (
              <li key={i} className="text-sm">
                • {insight}
              </li>
            ))}
          </ul>
        )}

        <Button className="mt-4" onClick={loadInsights}>
          Refresh Insights
        </Button>
      </CardContent>
    </Card>
  );
}
