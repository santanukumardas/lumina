
import { Category } from '../types';
import { ASSETS } from './assets';

export const LEARNING_MODULES: Category[] = [
  // --- LEARNING MODULES ---
  {
    id: 'exposure',
    title: 'Exposure Triangle',
    subtitle: 'Master the light',
    iconName: 'Camera',
    gradient: 'from-blue-600 to-indigo-900',
    backgroundImage: ASSETS.BACKGROUNDS.exposure,
    lessons: [
      { 
        id: 'aperture', 
        title: 'Aperture', 
        description: 'Depth of field',
        longDescription: 'Aperture controls the size of the opening in the lens. A wider aperture (lower f-number) lets in more light and creates a blurry background (bokeh), while a narrow aperture (higher f-number) keeps everything in focus.'
      },
      { 
        id: 'shutter', 
        title: 'Shutter Speed', 
        description: 'Motion freeze vs blur',
        longDescription: 'Shutter speed is the length of time camera sensor is exposed to light. Fast speeds freeze action, while slow speeds create motion blur, conveying a sense of movement.' 
      },
      { 
        id: 'iso', 
        title: 'ISO', 
        description: 'Sensor Sensitivity',
        longDescription: 'ISO measures the sensitivity of the image sensor. Higher ISO settings are useful in dark situations but introduce digital noise (grain) to the image.'
      },
      {
        id: 'histogram',
        title: 'Histogram',
        description: 'Reading light data',
        longDescription: 'A histogram is a graphical representation of the tonal values of your image. It shows the amount of tones of particular brightness found in your photograph ranging from black (0% brightness) to white (100% brightness).'
      },
      {
        id: 'metering',
        title: 'Metering Modes',
        description: 'Measuring brightness',
        longDescription: 'Metering is how your camera determines the correct shutter speed and aperture. Matrix metering considers the whole scene, Center-weighted prioritizes the middle, and Spot metering measures a tiny single point.'
      },
      {
        id: 'focal-length',
        title: 'Focal Length',
        description: 'Compression',
        longDescription: 'Focal length determines magnification and angle of view. Telephoto lenses (85mm+) compress the background, making it look closer to the subject, while wide-angle lenses (24mm) exaggerate distance.'
      },
      {
        id: 'sensor-size',
        title: 'Sensor Size',
        description: 'Crop Factor',
        longDescription: 'The size of your camera sensor affects the field of view. A "Full Frame" sensor is standard. Smaller sensors like APS-C or Micro 4/3 "crop" the image, making a 50mm lens act like a 75mm or 100mm lens.'
      },
      {
        id: 'focus-peaking',
        title: 'Focus Peaking',
        description: 'Manual Focus Aid',
        longDescription: 'Focus peaking is a real-time display aid that highlights high-contrast edges in a specific color (usually red or yellow) to show exactly which parts of the image are in sharp focus.'
      },
      {
        id: 'dynamic-range',
        title: 'Dynamic Range',
        description: 'Highlight & Shadow',
        longDescription: 'Dynamic range is the ratio between the lightest and darkest parts of an image. A high dynamic range camera can capture detail in both the bright sky and deep shadows simultaneously.'
      }
    ]
  },
  {
    id: 'composition',
    title: 'Composition',
    subtitle: 'Frame your world',
    iconName: 'Frame',
    gradient: 'from-emerald-600 to-teal-900',
    backgroundImage: ASSETS.BACKGROUNDS.composition,
    lessons: [
      { 
        id: 'thirds', 
        title: 'Rule of Thirds', 
        description: 'Balance and Interest',
        longDescription: 'Divide your image into nine equal segments by two vertical and two horizontal lines. Placing the subject along these lines or their intersections creates more tension, energy and interest.'
      },
      {
        id: 'symmetry',
        title: 'Symmetry',
        description: 'Perfect Balance',
        longDescription: 'Symmetry refers to a line that splits an object in half and, if both sides of the object are an exact mirror image of each other, then this object is said to be symmetrical. It creates a sense of harmony and proportion.'
      },
      {
        id: 'golden-ratio',
        title: 'Golden Ratio',
        description: 'Divine Proportion',
        longDescription: 'The Golden Ratio (1:1.618) is a mathematical ratio found in nature that creates aesthetically pleasing compositions. It guides the viewer through the entire photo in a natural flow.'
      },
      {
        id: 'framing',
        title: 'Framing',
        description: 'Depth and Context',
        longDescription: 'Framing involves using elements of a scene to create a frame within your frame. For example, shooting through a doorway, pulled back curtains, branches, or fences to highlight your subject.'
      },
      {
        id: 'negative-space',
        title: 'Negative Space',
        description: 'Minimalism',
        longDescription: 'Negative space is the area which surrounds the main subject in your photo (the positive space). It defines and emphasizes the main subject of a photo, drawing your eye to it.'
      },
      {
        id: 'balance',
        title: 'Visual Weight',
        description: 'Equilibrium',
        longDescription: 'Visual balance is about weighing elements. A small, dark object on one side can balance a large, light object on the other. It keeps the viewer form feeling like the image is "tipping" over.'
      },
      {
        id: 'dutch-angle',
        title: 'Dutch Angle',
        description: 'Cinematic Tension',
        longDescription: 'Also known as a Dutch Tilt, this involves tilting the camera so the horizon is not level. It creates a feeling of unease, tension, disorientation, or dynamic action.'
      },
      {
        id: 'keystoning',
        title: 'Keystoning',
        description: 'Perspective Control',
        longDescription: 'Keystoning occurs when looking up at tall buildings, making them look like they are falling backward. Correcting this makes vertical lines parallel, creating a more professional architectural look.'
      }
    ]
  },
  {
    id: 'lighting',
    title: 'Lighting',
    subtitle: 'Paint with photons',
    iconName: 'Sun',
    gradient: 'from-amber-600 to-orange-900',
    backgroundImage: ASSETS.BACKGROUNDS.lighting,
    lessons: [
      { 
        id: 'hard-soft', 
        title: 'Hard vs Soft', 
        description: 'Shadow quality',
        longDescription: 'Hard light creates sharp, defined shadows and high contrast. Soft light wraps around the subject, creating gradual transitions between light and shadow.'
      },
      {
        id: 'color-temp',
        title: 'Color Temp',
        description: 'White Balance',
        longDescription: 'Color temperature describes the warmth or coolness of a light source, measured in Kelvin. Low numbers (2000K) are warm/orange, while high numbers (8000K) are cool/blue.'
      },
      {
        id: 'three-point',
        title: 'Three-Point',
        description: 'Studio Setup',
        longDescription: 'The standard method used in visual media. It consists of a Key Light (main source), Fill Light (fills shadows), and Back Light (separates subject from background).'
      },
      {
        id: 'golden-hour',
        title: 'Golden Hour',
        description: 'Natural Magic',
        longDescription: 'The first hour after sunrise and the last hour before sunset. The sun is low in the sky, producing a soft, diffused light which is much more flattering than the harsh midday sun.'
      },
      {
        id: 'inverse-square',
        title: 'Inverse Square',
        description: 'Light Falloff',
        longDescription: 'The Inverse Square Law states that if you double the distance from the light source, you get one quarter of the light intensity. Moving a light slightly closer makes a massive difference.'
      },
      {
        id: 'gobos',
        title: 'Gobos',
        description: 'Shaping Shadow',
        longDescription: 'A Gobo (Go-Between Object) is a stencil placed inside or in front of a light source to control the shape of the emitted light and shadow, creating patterns like blinds or leaves.'
      },
      {
        id: 'flash-sync',
        title: 'Flash Sync',
        description: 'Motion Trails',
        longDescription: 'Flash sync timing determines when the flash fires during a long exposure. Rear curtain sync fires at the end, placing motion trails naturally behind the moving subject.'
      }
    ]
  },
  {
    id: 'post-production',
    title: 'Post-Production',
    subtitle: 'Develop the look',
    iconName: 'Sliders',
    gradient: 'from-fuchsia-600 to-pink-900',
    backgroundImage: ASSETS.BACKGROUNDS.postProd,
    lessons: [
        {
            id: 'light-panel',
            title: 'Light Panel',
            description: 'Exposure & Tone',
            longDescription: 'The foundation of all editing. Control overall brightness with Exposure, punchiness with Contrast, and fine-tune your range using Highlights, Shadows, Whites, and Blacks.'
        },
        {
            id: 'tone-curve',
            title: 'Tone Curve',
            description: 'Advanced Contrast',
            longDescription: 'The Tone Curve offers precise control over contrast. An "S-Curve" boosts contrast by darkening shadows and lifting highlights. Lifting the bottom point creates a "Matte" film look.'
        },
        {
            id: 'hsl-slider',
            title: 'HSL / Color Mix',
            description: 'Selective Color',
            longDescription: 'HSL (Hue, Saturation, Luminance) sliders allow you to change individual colors. You can turn green grass teal, desaturate a distracting blue shirt, or brighten orange skin tones.'
        },
        {
            id: 'split-toning',
            title: 'Color Grading',
            description: 'Cinematic Mood',
            longDescription: 'Color Grading (Split Toning) involves adding specific colors to the highlights and shadows independently. A classic cinematic look uses Teal in the shadows and Orange in the highlights.'
        },
        {
            id: 'clarity-sharpen',
            title: 'Detail Panel',
            description: 'Structure & Sharpness',
            longDescription: 'Sharpening increases contrast only at the edges of objects. Clarity increases contrast in the mid-tones, adding "crunch". Be careful not to overdo it, or you will introduce noise.'
        },
        {
            id: 'effects-panel',
            title: 'Effects Panel',
            description: 'Vignette & Grain',
            longDescription: 'Finishing touches. Vignettes darken corners to draw the eye inward. Grain adds a filmic texture. Dehaze cuts through fog but increases saturation and contrast.'
        }
    ]
  }
];

export const GALLERY_COLLECTIONS: Category[] = [
  {
    id: 'gal-nature',
    title: "Nature's Canvas",
    subtitle: 'Landscape & Wildlife',
    iconName: 'Mountain',
    gradient: 'from-green-600 to-emerald-900',
    backgroundImage: ASSETS.BACKGROUNDS.nature,
    lessons: [
      { id: 'gal-nat-land-1', title: 'Mountain Layers', description: 'Depth', longDescription: 'Analyzing depth through atmospheric perspective.' },
      { id: 'gal-nat-land-2', title: 'Yosemite Scale', description: 'Scale', longDescription: 'Using light to define massive geological forms.' },
      { id: 'gal-nat-land-3', title: 'Mirror Lake', description: 'Reflection', longDescription: 'Perfect symmetry in natural landscapes.' },
      { id: 'gal-nat-land-4', title: 'Misty Hills', description: 'Atmosphere', longDescription: 'How weather conditions create mood.' },
      { id: 'gal-nat-wild-2', title: 'Lion Gaze', description: 'Intensity', longDescription: 'Tight framing to create emotional connection.' },
      { id: 'gal-nat-wild-3', title: 'Hidden Leopard', description: 'Context', longDescription: 'Environmental storytelling in wildlife.' },
      { id: 'gal-nat-macro-1', title: 'Leaf Veins', description: 'Texture', longDescription: 'Abstract art found in nature.' },
      { id: 'gal-nat-forest-1', title: 'Tree Rhythm', description: 'Pattern', longDescription: 'Natural repetition of vertical lines.' },
      { id: 'gal-nat-astro-1', title: 'Milky Way', description: 'Night Sky', longDescription: 'Capturing light invisible to the human eye.' },
    ]
  },
  {
    id: 'gal-human',
    title: 'The Human Story',
    subtitle: 'Portrait & Street',
    iconName: 'Users',
    gradient: 'from-pink-600 to-rose-900',
    backgroundImage: ASSETS.BACKGROUNDS.human,
    lessons: [
      { id: 'gal-hum-port-1', title: 'The Stare', description: 'Connection', longDescription: 'The power of eye contact in portraits.' },
      { id: 'gal-hum-port-2', title: 'Studio Sculpting', description: 'Lighting', longDescription: 'Using shadow to define facial structure.' },
      { id: 'gal-hum-port-3', title: 'Character', description: 'Texture', longDescription: 'Emphasizing age and experience with light.' },
      { id: 'gal-hum-port-4', title: 'Soft Beauty', description: 'Diffusion', longDescription: 'Flattering light for beauty work.' },
      { id: 'gal-hum-street-1', title: 'Urban Solitude', description: 'Mood', longDescription: 'Atmosphere and isolation in the city.' },
      { id: 'gal-hum-street-2', title: 'Decisive Moment', description: 'Timing', longDescription: 'Capturing the perfect split-second interaction.' },
      { id: 'gal-hum-street-3', title: 'Silhouette', description: 'Mystery', longDescription: 'Reducing humans to graphic forms.' },
      { id: 'gal-hum-sport-1', title: 'Speed Blur', description: 'Panning', longDescription: 'Conveying velocity through motion blur.' },
      { id: 'gal-hum-sport-2', title: 'Mid-Air', description: 'Freeze', longDescription: 'Peak action timing in sports.' },
      { id: 'gal-hum-doc-1', title: 'Raw Emotion', description: 'B&W', longDescription: 'Removing color to focus on feeling.' },
      { id: 'gal-hum-group-1', title: 'The Band', description: 'Grouping', longDescription: 'Composing multiple subjects.' },
    ]
  },
  {
    id: 'gal-urban',
    title: 'Urban & Abstract',
    subtitle: 'Structure & Form',
    iconName: 'Building',
    gradient: 'from-violet-600 to-purple-900',
    backgroundImage: ASSETS.BACKGROUNDS.urban,
    lessons: [
      { id: 'gal-urb-arch-1', title: 'Skywards', description: 'Perspective', longDescription: 'Converging lines in skyscrapers.' },
      { id: 'gal-urb-arch-2', title: 'B&W Form', description: 'Shape', longDescription: 'Abstracting buildings into geometry.' },
      { id: 'gal-urb-arch-3', title: 'Windows', description: 'Repetition', longDescription: 'Finding patterns in the mundane.' },
      { id: 'gal-urb-night-2', title: 'Cyberpunk', description: 'Neon', longDescription: 'Cinematic color palettes at night.' },
      { id: 'gal-urb-night-3', title: 'Rainy Mood', description: 'Bokeh', longDescription: 'Abstract city lights through rain.' },
      { id: 'gal-urb-abs-2', title: 'Perfect Symmetry', description: 'Balance', longDescription: 'Finding order in architecture.' },
      { id: 'gal-urb-min-2', title: 'Isolation', description: 'Simplicity', longDescription: 'Removing distractions.' },
      { id: 'gal-urb-patt-1', title: 'The Break', description: 'Rhythm', longDescription: 'Interrupting the pattern.' },
      { id: 'gal-urb-food-1', title: 'Flat Lay', description: 'Organization', longDescription: 'Graphic design with food.' },
    ]
  },
  {
    id: 'gal-bw',
    title: 'Monochrome Mastery',
    subtitle: 'Light & Shadow',
    iconName: 'Moon',
    gradient: 'from-zinc-600 to-zinc-900',
    backgroundImage: ASSETS.BACKGROUNDS.bw,
    lessons: [
      { id: 'gal-bw-1', title: 'Zone System', description: 'Tones', longDescription: 'Mastering the full range from black to white.' },
      { id: 'gal-bw-2', title: 'Hard Shadow', description: 'Street', longDescription: 'Using shadows as geometric shapes.' },
      { id: 'gal-bw-3', title: 'Aged Texture', description: 'Portrait', longDescription: 'Revealing character through texture.' },
      { id: 'gal-bw-4', title: 'Minimalist', description: 'Architecture', longDescription: 'Simplifying structure to form and line.' },
      { id: 'gal-bw-5', title: 'Silky Water', description: 'Long Exposure', longDescription: 'Contrasting movement with static rocks.' },
      { id: 'gal-bw-6', title: 'Light Play', description: 'Abstract', longDescription: 'Chasing light and shadow patterns.' },
      { id: 'gal-bw-8', title: 'Film Noir', description: 'Atmosphere', longDescription: 'Creating mystery with darkness.' },
      { id: 'gal-bw-10', title: 'Forest Fog', description: 'Depth', longDescription: 'Tonal separation in landscapes.' },
    ]
  }
];

export interface ShowcaseData {
    img: string;
    why: string;
    takeaway: string;
    tags: string[];
}

export const SHOWCASE_DATA: Record<string, ShowcaseData> = {
    // --- NATURE ---
    'gal-nat-land-1': { img: ASSETS.GALLERY.nature1, why: "Strong foreground layers lead into majestic mountains.", takeaway: "Use foreground to add depth.", tags: ["Layering", "Golden Hour"] },
    'gal-nat-land-2': { img: ASSETS.GALLERY.nature2, why: "Yosemite's scale is emphasized by the light hitting the rock face.", takeaway: "Light defines form in landscapes.", tags: ["Scale", "Contrast"] },
    'gal-nat-land-3': { img: ASSETS.GALLERY.nature3, why: "Mirror-like reflection doubles the visual weight of the scene.", takeaway: "Low angles maximize reflections.", tags: ["Reflection", "Symmetry"] },
    'gal-nat-land-4': { img: ASSETS.GALLERY.nature4, why: "Mist separates the layers of hills, creating aerial perspective.", takeaway: "Weather creates mood and depth.", tags: ["Mist", "Atmosphere"] },
    'gal-nat-wild-2': { img: ASSETS.GALLERY.wild2, why: "Tight cropping on the lion's face creates intensity.", takeaway: "Fill the frame with the subject.", tags: ["Fill Frame", "Intensity"] },
    'gal-nat-wild-3': { img: ASSETS.GALLERY.wild3, why: "The leopard blends into the environment, showing context.", takeaway: "Environmental portraits tell a story.", tags: ["Context", "Camouflage"] },
    'gal-nat-macro-1': { img: ASSETS.GALLERY.macro1, why: "Macro photography transforms a simple leaf into an intricate map of nature.", takeaway: "Get close to reveal hidden worlds.", tags: ["Texture", "Abstract"] },
    'gal-nat-forest-1': { img: ASSETS.GALLERY.forest1, why: "Vertical trunks create a rhythm and natural pattern.", takeaway: "Repetition creates visual rhythm.", tags: ["Pattern", "Forest"] },
    'gal-nat-astro-1': { img: ASSETS.GALLERY.astro1, why: "Long exposure captures the Milky Way not visible to eyes.", takeaway: "Sensors see more than eyes at night.", tags: ["Astro", "Long Exposure"] },

    // --- HUMAN ---
    'gal-hum-port-1': { img: ASSETS.GALLERY.port1, why: "Shallow depth of field focuses entirely on the eyes.", takeaway: "Eyes are the anchor of portraits.", tags: ["Bokeh", "Eyes"] },
    'gal-hum-port-2': { img: ASSETS.GALLERY.port2, why: "Rembrandt lighting creates a triangle of light on the cheek.", takeaway: "Directional light sculpts the face.", tags: ["Studio", "Rembrandt"] },
    'gal-hum-port-3': { img: ASSETS.GALLERY.port3, why: "The texture of the skin is highlighted by side lighting.", takeaway: "Hard light emphasizes texture.", tags: ["Texture", "Character"] },
    'gal-hum-port-4': { img: ASSETS.GALLERY.port4, why: "Soft, diffused lighting makes skin look flawless.", takeaway: "Soft light is flattering.", tags: ["Soft Light", "Fashion"] },
    'gal-hum-street-1': { img: ASSETS.GALLERY.street1, why: "The moody atmosphere and solitary figure tell a story.", takeaway: "Mood over technical perfection.", tags: ["Street", "Atmosphere"] },
    'gal-hum-street-2': { img: ASSETS.GALLERY.street2, why: "Captured at the perfect moment of interaction.", takeaway: "Wait for the 'Decisive Moment'.", tags: ["Candid", "Timing"] },
    'gal-hum-street-3': { img: ASSETS.GALLERY.street3, why: "Silhouette creates mystery and focuses on form.", takeaway: "Expose for highlights to silhouette.", tags: ["Silhouette", "Mystery"] },
    'gal-hum-sport-1': { img: ASSETS.GALLERY.sport1, why: "Panning blurs the background to show speed.", takeaway: "Move with the subject.", tags: ["Panning", "Motion"] },
    'gal-hum-sport-2': { img: ASSETS.GALLERY.sport2, why: "Peak action caught mid-air.", takeaway: "Anticipate the peak of the movement.", tags: ["Action", "Timing"] },
    'gal-hum-doc-1': { img: ASSETS.GALLERY.doc1, why: "Black and white emphasizes the raw emotion.", takeaway: "B&W removes color distraction.", tags: ["B&W", "Emotion"] },
    'gal-hum-group-1': { img: ASSETS.GALLERY.group1, why: "Triangular composition creates stability in groups.", takeaway: "Look for triangles in grouping.", tags: ["Group", "Composition"] },

    // --- URBAN & ABSTRACT ---
    'gal-urb-arch-1': { img: ASSETS.GALLERY.arch1, why: "Looking up creates powerful converging vertical lines.", takeaway: "Change your perspective.", tags: ["Perspective", "Lines"] },
    'gal-urb-arch-2': { img: ASSETS.GALLERY.arch2, why: "High contrast B&W turns building into shape study.", takeaway: "Architecture is geometry.", tags: ["Geometry", "B&W"] },
    'gal-urb-arch-3': { img: ASSETS.GALLERY.arch3, why: "The repetition of identical windows creates a soothing rhythm.", takeaway: "Fill frame with pattern.", tags: ["Pattern", "Repetition"] },
    'gal-urb-night-2': { img: ASSETS.GALLERY.night2, why: "Neon lights create a cyberpunk aesthetic.", takeaway: "Mixed lighting creates mood.", tags: ["Neon", "Night"] },
    'gal-urb-night-3': { img: ASSETS.GALLERY.night3, why: "Rain on glass creates natural bokeh/distortion.", takeaway: "Shoot through textured surfaces.", tags: ["Bokeh", "Abstract"] },
    'gal-urb-abs-2': { img: ASSETS.GALLERY.abs2, why: "Perfect symmetry makes the image feel balanced.", takeaway: "Symmetry equals order.", tags: ["Symmetry", "Abstract"] },
    'gal-urb-min-2': { img: ASSETS.GALLERY.min2, why: "The tiny figure against the massive mountain emphasizes scale and isolation.", takeaway: "Use scale to show vulnerability.", tags: ["Scale", "Isolation"] },
    'gal-urb-patt-1': { img: ASSETS.GALLERY.patt1, why: "The break in the pattern draws the eye.", takeaway: "Break the rhythm.", tags: ["Pattern", "Break"] },
    'gal-urb-food-1': { img: ASSETS.GALLERY.food1, why: "The overhead angle flattens depth, focusing on arrangement and color.", takeaway: "Overhead for organization.", tags: ["Flat Lay", "Food"] },

    // --- BLACK & WHITE (MONOCHROME) ---
    'gal-bw-1': { img: ASSETS.GALLERY.bw1, why: "Ansel Adams style landscape relying purely on tonal range.", takeaway: "Zone system mastery.", tags: ["Landscape", "Contrast"] },
    'gal-bw-2': { img: ASSETS.GALLERY.bw2, why: "High contrast emphasizes the geometric shadows.", takeaway: "Shadows become shapes.", tags: ["Street", "Shadows"] },
    'gal-bw-3': { img: ASSETS.GALLERY.bw3, why: "Wrinkles and texture tell a story without color distraction.", takeaway: "Texture conveys history.", tags: ["Portrait", "Texture"] },
    'gal-bw-4': { img: ASSETS.GALLERY.bw4, why: "Minimalist architecture focusing on form and line.", takeaway: "Simplify the composition.", tags: ["Architecture", "Minimalism"] },
    'gal-bw-5': { img: ASSETS.GALLERY.bw5, why: "Long exposure softens water against hard rocks.", takeaway: "Contrast motion and static.", tags: ["Long Exposure", "Nature"] },
    'gal-bw-6': { img: ASSETS.GALLERY.bw6, why: "Abstract play of light and shadow.", takeaway: "Look for light, not objects.", tags: ["Abstract", "Light"] },
    'gal-bw-8': { img: ASSETS.GALLERY.bw8, why: "Classic film noir atmosphere.", takeaway: "Mood over clarity.", tags: ["Noir", "Atmosphere"] },
    'gal-bw-10': { img: ASSETS.GALLERY.bw10, why: "Fog creates separation between trees.", takeaway: "Tonal separation creates depth.", tags: ["Fog", "Nature"] },
};
