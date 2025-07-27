import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AnalysisResult, GroundingMetadata, WebInsight, BrandProfile, MediaPlan } from "../types";
import { translations } from "../translations";

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Schema definition for structured market analysis response
const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "Analizin 2-3 cümlelik bir özeti.",
    },
    trends: {
      type: Type.ARRAY,
      description: "Pazardaki en önemli 3-5 trend.",
      items: { type: Type.STRING },
    },
    competitors: {
      type: Type.ARRAY,
      description: "Ana rakipler ve her biri hakkında kısa bir analiz.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Rakip firma adı." },
          analysis: { type: Type.STRING, description: "Rakibin güçlü ve zayıf yönleri hakkında kısa analiz." },
        },
        required: ["name", "analysis"]
      },
    },
    opportunities: {
        type: Type.ARRAY,
        description: "Pazardaki büyüme veya inovasyon için 3-5 fırsat.",
        items: { type: Type.STRING },
    },
    risks: {
        type: Type.ARRAY,
        description: "Pazara girerken veya pazarda faaliyet gösterirken karşılaşılabilecek 3-5 risk.",
        items: { type: Type.STRING },
    },
    targetAudience: {
        type: Type.STRING,
        description: "Bu pazar veya ürün için ideal hedef kitlenin ayrıntılı bir tanımı.",
    }
  },
  required: ["summary", "trends", "competitors", "opportunities", "risks", "targetAudience"],
};

/**
 * Generates a structured market analysis for a given topic.
 * @param topic The market or product to analyze.
 * @returns A structured analysis result.
 */
export const generateMarketAnalysis = async (topic: string): Promise<AnalysisResult> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Pazarlama zekası uzmanı olarak, "${topic}" konusu için detaylı bir pazar analizi yap.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
            },
        });

        const jsonText = response.text.trim();
        // The response text is already a JSON string because of the schema
        const result = JSON.parse(jsonText) as AnalysisResult;
        return result;

    } catch (error) {
        console.error("Error generating market analysis:", error);
        throw new Error("Yapay zeka analizi oluşturulamadı.");
    }
};

/**
 * Fetches web insights for a given query using Google Search grounding.
 * @param query The query for which to find web sources.
 * @returns An object containing the main text response and an array of web insights.
 */
export const generateWebInsights = async (query: string): Promise<{ text: string; insights: WebInsight[] }> => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `"${query}" hakkında en güncel web bilgilerini kullanarak kısa bir özet sağla.`,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });
        
        const groundingMetadata = response.candidates?.[0]?.groundingMetadata as GroundingMetadata | undefined;
        const insights = groundingMetadata?.groundingChunks?.map(chunk => chunk.web) || [];
        
        return {
            text: response.text,
            insights: insights,
        };

    } catch (error) {
        console.error("Error generating web insights:", error);
        throw new Error("Web kaynakları getirilemedi.");
    }
};


/**
 * Generates a chat response from Gemini based on a prompt and page context.
 * @param prompt The user's direct question.
 * @param context A string describing the user's current page/context.
 * @param language The current language of the application.
 * @returns A string containing the AI's response.
 */
export const generateChatResponse = async (prompt: string, context: string, language: 'tr' | 'en'): Promise<string> => {
    try {
        const t = translations[language].pageContent.aiAssistant;
        const fullPrompt = `
            ${t.context} ${context}
            ${t.question} "${prompt}"

            ${t.system_prompt}
        `;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: fullPrompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating chat response:", error);
        throw new Error("Yapay zeka yanıtı oluşturulamadı.");
    }
};

const mediaPlanSchema = {
    type: Type.OBJECT,
    properties: {
        strategicRationale: {
            type: Type.STRING,
            description: "Planın arkasındaki 2-3 cümlelik stratejik mantık.",
        },
        funnelAllocation: {
            type: Type.ARRAY,
            description: "Bütçenin Farkındalık, Değerlendirme ve Dönüşüm hunileri arasındaki yüzdesel dağılımı.",
            items: {
                type: Type.OBJECT,
                properties: {
                    stage: { type: Type.STRING, enum: ['Farkındalık', 'Değerlendirme', 'Dönüşüm'] },
                    percentage: { type: Type.NUMBER },
                },
                required: ["stage", "percentage"]
            },
        },
        channelBreakdown: {
            type: Type.ARRAY,
            description: "Bütçenin kanallara göre dağılımı, her kanalın huni aşaması ve tahmini KPI'ları.",
            items: {
                type: Type.OBJECT,
                properties: {
                    channel: { type: Type.STRING, enum: ['Google', 'Meta', 'TikTok', 'İçerik', 'Diğer'] },
                    budget: { type: Type.NUMBER },
                    funnelStage: { type: Type.STRING, enum: ['Farkındalık', 'Değerlendirme', 'Dönüşüm'] },
                    estimatedKpi: { type: Type.STRING, description: "Bu kanaldan beklenen tahmini sonuç (örn: 1.5M Görüntülenme, 15k Tıklama, 500 Satış)." },
                },
                required: ["channel", "budget", "funnelStage", "estimatedKpi"]
            }
        }
    },
    required: ["strategicRationale", "funnelAllocation", "channelBreakdown"],
};

/**
 * Generates a structured media plan based on brand profile and budget.
 * @param brandProfile The brand's profile from onboarding.
 * @param budget The total monthly budget.
 * @returns A structured media plan.
 */
export const generateMediaPlan = async (brandProfile: BrandProfile, budget: number): Promise<MediaPlan> => {
    try {
        const prompt = `
            Bir medya planlama uzmanı olarak, aşağıdaki marka profili ve aylık bütçeye dayalı olarak stratejik bir medya planı oluştur.
            Marka Profili:
            - İş Modeli: ${brandProfile.businessModel || 'Belirtilmemiş'}
            - Sektör: ${brandProfile.industry || 'Belirtilmemiş'}
            - Müşteri Tipi: ${brandProfile.customerType || 'Belirtilmemiş'}
            - Pazarlama Hedefi: ${brandProfile.marketingGoal || 'Belirtilmemiş'}
            - Aylık Bütçe: ${budget}

            Aşağıdaki JSON şemasına göre bir yanıt oluştur:
            1.  **strategicRationale**: Planın arkasındaki 2-3 cümlelik stratejik mantık.
            2.  **funnelAllocation**: Bütçenin Farkındalık, Değerlendirme ve Dönüşüm hunileri arasındaki yüzdesel dağılımı.
            3.  **channelBreakdown**: Bütçenin kanallara (Google, Meta, TikTok, İçerik, Diğer) göre dağılımı, her kanalın huni aşaması ve tahmini KPI'ları. Bütçe rakamları toplam bütçeyle tutarlı olmalıdır.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: mediaPlanSchema,
            },
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText) as MediaPlan;
        return result;

    } catch (error) {
        console.error("Error generating media plan:", error);
        throw new Error("Medya planı oluşturulamadı.");
    }
};