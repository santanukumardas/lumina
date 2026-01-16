
import React from 'react';
import { Check, Lightbulb, Tag } from 'lucide-react';

interface ShowcaseData {
    img: string;
    why: string;
    takeaway: string;
    tags: string[];
}

const SHOWCASE_DATA: Record<string, ShowcaseData> = {
    // --- NATURE ---
    'gal-nat-land-1': { img: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=60&w=1000&auto=format&fit=crop', why: "Strong foreground layers lead into majestic mountains.", takeaway: "Use foreground to add depth.", tags: ["Layering", "Golden Hour"] },
    'gal-nat-land-2': { img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=60&w=1000&auto=format&fit=crop', why: "Yosemite's scale is emphasized by the light hitting the rock face.", takeaway: "Light defines form in landscapes.", tags: ["Scale", "Contrast"] },
    'gal-nat-land-3': { img: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=60&w=1000&auto=format&fit=crop', why: "Mirror-like reflection doubles the visual weight of the scene.", takeaway: "Low angles maximize reflections.", tags: ["Reflection", "Symmetry"] },
    'gal-nat-land-4': { img: 'https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?q=60&w=1000&auto=format&fit=crop', why: "Mist separates the layers of hills, creating aerial perspective.", takeaway: "Weather creates mood and depth.", tags: ["Mist", "Atmosphere"] },
    'gal-nat-wild-2': { img: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=60&w=1000&auto=format&fit=crop', why: "Tight cropping on the lion's face creates intensity.", takeaway: "Fill the frame with the subject.", tags: ["Fill Frame", "Intensity"] },
    'gal-nat-wild-3': { img: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?q=60&w=1000&auto=format&fit=crop', why: "The leopard blends into the environment, showing context.", takeaway: "Environmental portraits tell a story.", tags: ["Context", "Camouflage"] },
    'gal-nat-wild-4': { img: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9dab?q=60&w=1000&auto=format&fit=crop', why: "Backlighting outlines the fox in a rim of light.", takeaway: "Backlight creates separation.", tags: ["Rim Light", "Golden Hour"] },
    'gal-nat-macro-1': { img: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=60&w=1000&auto=format&fit=crop', why: "Macro photography transforms a simple leaf into an intricate map of nature.", takeaway: "Get close to reveal hidden worlds.", tags: ["Texture", "Abstract"] },
    'gal-nat-forest-1': { img: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=60&w=1000&auto=format&fit=crop', why: "Vertical trunks create a rhythm and natural pattern.", takeaway: "Repetition creates visual rhythm.", tags: ["Pattern", "Forest"] },
    'gal-nat-astro-1': { img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=60&w=1000&auto=format&fit=crop', why: "Long exposure captures the Milky Way not visible to eyes.", takeaway: "Sensors see more than eyes at night.", tags: ["Astro", "Long Exposure"] },

    // --- HUMAN ---
    'gal-hum-port-1': { img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=60&w=1000&auto=format&fit=crop', why: "Shallow depth of field focuses entirely on the eyes.", takeaway: "Eyes are the anchor of portraits.", tags: ["Bokeh", "Eyes"] },
    'gal-hum-port-2': { img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=60&w=1000&auto=format&fit=crop', why: "Rembrandt lighting creates a triangle of light on the cheek.", takeaway: "Directional light sculpts the face.", tags: ["Studio", "Rembrandt"] },
    'gal-hum-port-3': { img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=60&w=1000&auto=format&fit=crop', why: "The texture of the skin is highlighted by side lighting.", takeaway: "Hard light emphasizes texture.", tags: ["Texture", "Character"] },
    'gal-hum-port-4': { img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=60&w=1000&auto=format&fit=crop', why: "Soft, diffused lighting makes skin look flawless.", takeaway: "Soft light is flattering.", tags: ["Soft Light", "Fashion"] },
    'gal-hum-street-1': { img: 'https://images.unsplash.com/photo-1485550409059-9afb054cada4?q=60&w=1000&auto=format&fit=crop', why: "The moody atmosphere and solitary figure tell a story.", takeaway: "Mood over technical perfection.", tags: ["Street", "Atmosphere"] },
    'gal-hum-street-2': { img: 'https://images.unsplash.com/photo-1542598953-41310c43f54b?q=60&w=1000&auto=format&fit=crop', why: "Captured at the perfect moment of interaction.", takeaway: "Wait for the 'Decisive Moment'.", tags: ["Candid", "Timing"] },
    'gal-hum-street-3': { img: 'https://images.unsplash.com/photo-1494587351196-bbf5f29cff42?q=60&w=1000&auto=format&fit=crop', why: "Silhouette creates mystery and focuses on form.", takeaway: "Expose for highlights to silhouette.", tags: ["Silhouette", "Mystery"] },
    'gal-hum-sport-1': { img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=60&w=1000&auto=format&fit=crop', why: "Panning blurs the background to show speed.", takeaway: "Move with the subject.", tags: ["Panning", "Motion"] },
    'gal-hum-sport-2': { img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=60&w=1000&auto=format&fit=crop', why: "Peak action caught mid-air.", takeaway: "Anticipate the peak of the movement.", tags: ["Action", "Timing"] },
    'gal-hum-doc-1': { img: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=60&w=1000&auto=format&fit=crop', why: "Black and white emphasizes the raw emotion.", takeaway: "B&W removes color distraction.", tags: ["B&W", "Emotion"] },
    'gal-hum-group-1': { img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=60&w=1000&auto=format&fit=crop', why: "Triangular composition creates stability in groups.", takeaway: "Look for triangles in grouping.", tags: ["Group", "Composition"] },

    // --- URBAN & ABSTRACT ---
    'gal-urb-arch-1': { img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=60&w=1000&auto=format&fit=crop', why: "Looking up creates powerful converging vertical lines.", takeaway: "Change your perspective.", tags: ["Perspective", "Lines"] },
    'gal-urb-arch-2': { img: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=60&w=1000&auto=format&fit=crop', why: "High contrast B&W turns building into shape study.", takeaway: "Architecture is geometry.", tags: ["Geometry", "B&W"] },
    'gal-urb-arch-3': { img: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=60&w=1000&auto=format&fit=crop', why: "The repetition of identical windows creates a soothing rhythm.", takeaway: "Fill frame with pattern.", tags: ["Pattern", "Repetition"] },
    'gal-urb-night-2': { img: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?q=60&w=1000&auto=format&fit=crop', why: "Neon lights create a cyberpunk aesthetic.", takeaway: "Mixed lighting creates mood.", tags: ["Neon", "Night"] },
    'gal-urb-night-3': { img: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=60&w=1000&auto=format&fit=crop', why: "Rain on glass creates natural bokeh/distortion.", takeaway: "Shoot through textured surfaces.", tags: ["Bokeh", "Abstract"] },
    'gal-urb-abs-2': { img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=60&w=1000&auto=format&fit=crop', why: "Perfect symmetry makes the image feel balanced.", takeaway: "Symmetry equals order.", tags: ["Symmetry", "Abstract"] },
    'gal-urb-min-2': { img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=60&w=1000&auto=format&fit=crop', why: "The tiny figure against the massive mountain emphasizes scale and isolation.", takeaway: "Use scale to show vulnerability.", tags: ["Scale", "Isolation"] },
    'gal-urb-patt-1': { img: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=60&w=1000&auto=format&fit=crop', why: "The break in the pattern draws the eye.", takeaway: "Break the rhythm.", tags: ["Pattern", "Break"] },
    'gal-urb-food-1': { img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=60&w=1000&auto=format&fit=crop', why: "The overhead angle flattens depth, focusing on arrangement and color.", takeaway: "Overhead for organization.", tags: ["Flat Lay", "Food"] },

    // --- BLACK & WHITE (MONOCHROME) - STRICTLY SATURATION -100 ---
    'gal-bw-1': { img: 'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=60&w=1000&sat=-100', why: "Ansel Adams style landscape relying purely on tonal range.", takeaway: "Zone system mastery.", tags: ["Landscape", "Contrast"] },
    'gal-bw-2': { img: 'https://images.unsplash.com/photo-1534260164206-2a3a4a72891d?q=60&w=1000&sat=-100', why: "High contrast emphasizes the geometric shadows.", takeaway: "Shadows become shapes.", tags: ["Street", "Shadows"] },
    'gal-bw-3': { img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=60&w=1000&sat=-100', why: "Wrinkles and texture tell a story without color distraction.", takeaway: "Texture conveys history.", tags: ["Portrait", "Texture"] },
    'gal-bw-4': { img: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=60&w=1000&sat=-100', why: "Minimalist architecture focusing on form and line.", takeaway: "Simplify the composition.", tags: ["Architecture", "Minimalism"] },
    'gal-bw-5': { img: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=60&w=1000&sat=-100', why: "Long exposure softens water against hard rocks.", takeaway: "Contrast motion and static.", tags: ["Long Exposure", "Nature"] },
    'gal-bw-6': { img: 'https://images.unsplash.com/photo-1505567745926-ba89000d255a?q=60&w=1000&sat=-100', why: "Abstract play of light and shadow.", takeaway: "Look for light, not objects.", tags: ["Abstract", "Light"] },
    'gal-bw-8': { img: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=60&w=1000&sat=-100', why: "Classic film noir atmosphere.", takeaway: "Mood over clarity.", tags: ["Noir", "Atmosphere"] },
    'gal-bw-10': { img: 'https://images.unsplash.com/photo-1446034295857-c39f8844fad4?q=60&w=1000&sat=-100', why: "Fog creates separation between trees.", takeaway: "Tonal separation creates depth.", tags: ["Fog", "Nature"] },
};

export const ShowcaseViewer: React.FC<{ id: string }> = ({ id }) => {
    const data = SHOWCASE_DATA[id];

    if (!data) return <div className="text-white">Image data not found</div>;

    return (
        <div className="flex flex-col md:flex-row w-full h-full bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            {/* Image Side */}
            <div className="md:w-2/3 h-64 md:h-auto relative group overflow-hidden bg-zinc-900">
                <img 
                    src={data.img} 
                    alt="Showcase" 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div className="flex gap-2 flex-wrap">
                        {data.tags?.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-md text-xs font-bold text-white border border-white/10">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Analysis Side */}
            <div className="md:w-1/3 bg-zinc-900 p-6 md:p-8 flex flex-col justify-center border-l border-zinc-800">
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold uppercase tracking-wider text-xs">
                        <Check size={14} /> Analysis
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 leading-tight">Why it works</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        {data.why}
                    </p>
                </div>

                <div className="w-full h-px bg-zinc-800 my-2"></div>

                <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold uppercase tracking-wider text-xs">
                        <Lightbulb size={14} /> Key Takeaway
                    </div>
                    <p className="text-zinc-300 text-sm font-medium italic border-l-2 border-amber-500/50 pl-3 py-1">
                        "{data.takeaway}"
                    </p>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-wrap gap-2">
                     <span className="text-xs text-zinc-600 font-mono">CONCEPTS:</span>
                     {data.tags?.map((tag, i) => (
                         <span key={i} className="text-xs text-zinc-500 flex items-center gap-1">
                             <Tag size={10} /> {tag}
                         </span>
                     ))}
                </div>
            </div>
        </div>
    );
};
