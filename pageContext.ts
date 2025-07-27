
import { Page } from '../types';

export const getPageContext = (page: Page): string => {
    switch(page) {
        case Page.Dashboard:
            return "Kullanıcı Ana Panel (Dashboard) sayfasında. Bu sayfa genel metrikleri (ziyaretçi, dönüşüm oranı, gelir) ve önemli uyarıları gösteriyor.";
        case Page.MarketAnalysis:
            return "Kullanıcı Pazar Analizi sayfasında. Bu sayfada yapay zeka ile pazar, ürün veya sektör analizi yapılıyor.";
        case Page.CompetitorAnalysis:
            return "Kullanıcı Rakip Takibi sayfasında. Rakiplerin web trafiği, sosyal etkileşim ve anahtar kelime metrikleri izleniyor.";
        case Page.ImpactAnalysis:
            return "Kullanıcı Gerçek Etki Analizi sayfasında. Pazarlama kanallarının gerçek satış etkisini (uplift) ve doğal satışı karşılaştırıyor.";
        case Page.Strategy:
            return "Kullanıcı Strateji sayfasında. Şirketin pazarlama strateji dokümanları listeleniyor.";
        case Page.Creative:
            return "Kullanıcı Kreatif Galerisi sayfasında. Kampanyalarda kullanılan görseller ve videolar performans metrikleriyle birlikte sergileniyor.";
        case Page.Reports:
            return "Kullanıcı Raporlar sayfasında. Aylık performans, reklam kârlılığı gibi çeşitli rapor şablonları bulunuyor.";
        case Page.Opportunities:
            return "Kullanıcı Fırsat Takvimi sayfasında. Yaklaşan özel günler veya piyasa koşullarına göre dinamik kampanya önerileri sunuluyor.";
        case Page.Scenarios:
            return "Kullanıcı Bütçe Senaryoları sayfasında. Farklı pazarlama bütçelerinin potansiyel ciro, müşteri ve ziyaretçi sonuçları simüle ediliyor.";
        case Page.Google:
            return "Kullanıcı Google Ads Performansı sayfasında. ROAS, TBM, dönüşümler ve en iyi kampanyalar gibi Google Ads metrikleri bulunuyor.";
        case Page.Meta:
            return "Kullanıcı Meta Ads Performansı sayfasında. Facebook ve Instagram kampanyalarının ROAS, etkileşim oranı ve potansiyel müşteri maliyeti gibi metrikleri izleniyor.";
        case Page.TikTok:
            return "Kullanıcı TikTok Ads Performansı sayfasında. Görüntülenme, CPV ve etkileşim gibi TikTok metrikleri bulunuyor.";
        case Page.Audiences:
            return "Kullanıcı Hedef Kitleler sayfasında. Pazarlama kampanyaları için tanımlanmış hedef kitle segmentleri listeleniyor.";
        case Page.Customers:
            return "Kullanıcı Müşteriler sayfasında. Müşteri listesi ve seçilen müşterinin zaman tüneli (etkileşim geçmişi) görüntüleniyor.";
        case Page.Products:
            return "Kullanıcı Ürünler sayfasında. Ürünlerin performansı, potansiyel skoru ve stok durumu analiz ediliyor. Ayrıca stokla ilgili öneriler sunuluyor.";
        case Page.Loyalty:
            return "Kullanıcı Tahmine Dayalı Sadakat sayfasında. Müşterilerin gelecekteki davranışlarını tahmin eden segmentler ve sadakatle ilgili öneriler yer alıyor.";
        case Page.Autopilot:
            return "Kullanıcı Otopilot Modu sayfasında. Pazarlama bütçesinin yapay zeka tarafından otonom olarak yönetildiği bir arayüz var.";
        case Page.Actions:
            return "Kullanıcı Önerilen Aksiyonlar sayfasında. Verilere dayanarak oluşturulmuş, büyümeyi hızlandıracak pazarlama görevleri listeleniyor.";
        case Page.Tasks:
            return "Kullanıcı Görev Panosu sayfasında. Ekipler arası görevlerin yönetildiği bir kanban panosu bulunuyor.";
        case Page.Ekip:
            return "Kullanıcı Ekip Yönetimi sayfasında. Platformu kullanan tüm ekip üyeleri listeleniyor.";
        case Page.Automations:
            return "Kullanıcı Otomatik Uygulamalar sayfasında. Tekrarlayan pazarlama görevlerini otomatikleştiren araçlar bulunuyor.";
        case Page.Connections:
            return "Kullanıcı Platform Bağlantıları sayfasında. Google Analytics, Meta Ads gibi veri kaynaklarının bağlandığı yer.";
        case Page.Settings:
            return "Kullanıcı Ayarlar sayfasında. Profil ve bildirim ayarları yapılıyor.";
        case Page.Profitability:
            return "Kullanıcı Kârlılık Paneli sayfasında. Bu sayfa, pazarlama faaliyetlerinin anlık kâr/zarar durumunu (P&L), kanallara ve ürünlere göre kârlılık dağılımını gösterir.";
        case Page.Collaborations:
            return "Kullanıcı İş Birlikleri Merkezi sayfasında. Influencer ve satış ortaklığı performansını takip eder, komisyonları hesaplar ve en iyi/kötü performans gösteren iş birliklerini öne çıkarır.";
        default:
            return `Kullanıcı şu anda '${page}' sayfasında.`;
    }
};
