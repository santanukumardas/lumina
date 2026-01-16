
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

export const APP_TOOLS = [
    { id: 'exposure-reflex', title: 'Exposure Reflex', description: 'Exposure Training Game' },
    { id: 'perspective-shift', title: 'Perspective Shift', description: 'Dolly Zoom Puzzle' },
    { id: 'eq-exposure', title: 'Exposure Locker', description: 'Reciprocity Calculator' },
    { id: 'fov-comparator', title: 'FoV Comparator', description: 'Lens & Sensor Visualizer' },
    { id: 'darkroom', title: 'Darkroom', description: 'Color Grading & Exposure' },
    { id: 'chroma-lab', title: 'Chroma Lab', description: 'Palette Generator' },
    { id: 'studio-planner', title: 'Studio Planner', description: 'Lighting Diagram Builder' },
    { id: 'dof-calc', title: 'DoF Visualizer', description: 'Depth of Field Calculator' },
    { id: 'nd-sim', title: 'ND Filter Lab', description: 'Long Exposure Simulator' },
    { id: 'rgb-curves', title: 'RGB Curves', description: 'Advanced Color Grading' },
    { id: 'zone-system', title: 'Zone System', description: 'Exposure Zone Mapper' },
    { id: 'diffraction', title: 'Diffraction Calc', description: 'Sharpness Limit Calculator' },
];

export const TOPICS = [
    "Airy Disk", "Aperture", "Astrophotography", "Blue Hour", "Bokeh", 
    "Chromatic Aberration", "Clarity", "Color Grading", "Color Harmony", 
    "Color Temperature", "Compression (Lens)", "Contrast", "Crop Factor", 
    "Depth of Field", "Diffraction", "Dutch Angle", "Dynamic Range", 
    "Exposure Triangle", "False Color", "Fill Light", "Film Grain", 
    "Flash Sync", "Flat Lay", "Focal Length", "Focus Peaking", "Framing", 
    "Gobos", "Golden Hour", "Golden Ratio", "High Key", "Histogram", 
    "HSL", "Hyperfocal Distance", "Inverse Square Law", "ISO", "Key Light", 
    "Keystoning", "Leading Lines", "Long Exposure", "Low Key", 
    "Macro Photography", "Metering Modes", "Monochrome", "Motion Blur", 
    "Negative Space", "ND Filters", "Panning", "Pixel Pitch", 
    "Reciprocity", "Rembrandt Lighting", "Rim Light", "RGB Curves", "Rule of Thirds", 
    "Sensor Size", "Shadows & Highlights", "Sharpening", "Shutter Speed", 
    "Silhouette", "Split Toning", "Symmetry", "Three-Point Lighting", 
    "Tone Curve", "Vignette", "Visual Weight", "White Balance", "Zone System"
];

interface ConceptData {
    definition: string;
    howItWorks: string;
    creativeUse: string;
    commonMistakes?: string;
    tool: string;
    toolTip?: string;
}

export const OFFLINE_KNOWLEDGE: Record<string, ConceptData> = {
    "Aperture": { 
        definition: "The adjustable opening in the lens diaphragm through which light travels.", 
        howItWorks: "Measured in f-stops. Lower numbers (f/1.4) mean a larger hole; higher numbers (f/16) mean a smaller hole.",
        creativeUse: "Use wide apertures (f/1.8) for soft backgrounds (bokeh). Use narrow apertures (f/11) for landscapes.",
        tool: "Aperture Simulator", toolTip: "Toggle 'Portrait' mode to see bokeh effects."
    },
    "Shutter Speed": { 
        definition: "The duration the camera sensor is exposed to light.", 
        howItWorks: "Fast speeds (1/1000s) freeze time. Slow speeds (1s) create motion blur.",
        creativeUse: "Use slow speeds to smooth out water or capture light trails.",
        tool: "Shutter Speed Simulator", toolTip: "Try the 'Water Flow' scene."
    },
    "ISO": { 
        definition: "The sensor's sensitivity to light.", 
        howItWorks: "Higher ISO amplifies the signal but introduces digital noise (grain).",
        creativeUse: "Essential for shooting handheld in low light environments.",
        tool: "ISO Simulator", toolTip: "Zoom in to see the noise pattern."
    },
    "Depth of Field": { 
        definition: "The range of distance that appears acceptably sharp.", 
        howItWorks: "Affected by Aperture (wider=less), Focal Length (longer=less), and Distance (closer=less).",
        creativeUse: "Isolate a subject from a busy street using shallow depth of field.",
        tool: "DoF Visualizer", toolTip: "Move the subject out of the green zone."
    },
    "Focal Length": { 
        definition: "The distance from the lens optical center to the sensor, determining zoom.", 
        howItWorks: "Short (Wide) expands the view. Long (Telephoto) brings things closer.",
        creativeUse: "Telephoto lenses flatter portraits; Wide lenses exaggerate landscape scale.",
        tool: "Focal Length Simulator", toolTip: "Observe background compression."
    },
    "Compression (Lens)": {
        definition: "The optical effect where background elements appear larger and closer to the subject.",
        howItWorks: "Achieved by standing further away and using a long focal length lens.",
        creativeUse: "Make a distant mountain look massive behind your subject.",
        tool: "Perspective Shift", toolTip: "Match the Dolly Zoom targets."
    },
    "Histogram": { 
        definition: "A graph showing the distribution of light tones in an image.", 
        howItWorks: "Left is black, right is white. Ideally, data should not touch the walls (clipping).",
        creativeUse: "Use it to expose 'to the right' (ETTR) for maximum quality without clipping.",
        tool: "Histogram Simulator", toolTip: "Watch the mountain move as you expose."
    },
    "Exposure Triangle": {
        definition: "The balance between Aperture, Shutter Speed, and ISO.",
        howItWorks: "Changing one setting requires adjusting another to maintain the same brightness.",
        creativeUse: "Trade ISO for Shutter Speed to get a cleaner shot if you have a tripod.",
        tool: "Exposure Reflex", toolTip: "Play the game to build muscle memory."
    },
    "Reciprocity": {
        definition: "The inverse relationship between intensity and duration of light.",
        howItWorks: "Aperture area and shutter duration can be traded to keep exposure constant.",
        creativeUse: "Lock your exposure and slow your shutter to blur water without brightening the image.",
        tool: "Exposure Locker", toolTip: "Lock EV and adjust Shutter Speed."
    },
    "Metering Modes": { 
        definition: "How the camera measures light to determine exposure.", 
        howItWorks: "Matrix reads the whole scene. Spot reads only the center point.",
        creativeUse: "Use Spot Metering for backlit subjects to prevent silhouettes.",
        tool: "Metering Simulator", toolTip: "Switch to Spot Mode."
    },
    "Rule of Thirds": { 
        definition: "Dividing the frame into a 3x3 grid to place subjects off-center.", 
        howItWorks: "Placing points of interest on intersections creates visual tension and energy.",
        creativeUse: "Place the subject's eyes on the top-right intersection.",
        tool: "Composition Simulators", toolTip: "Toggle the grid overlay."
    },
    "Golden Ratio": { 
        definition: "A ratio of 1:1.618 found in nature that is aesthetically pleasing.", 
        howItWorks: "Visualized as a spiral narrowing down to a focal point.",
        creativeUse: "Organize complex scenes so the eye flows naturally to the subject.",
        tool: "Composition Simulators", toolTip: "Compare Phi Grid vs Rule of Thirds."
    },
    "Color Temperature": { 
        definition: "The warmth or coolness of white light.", 
        howItWorks: "Measured in Kelvin. 2000K is warm (orange), 8000K is cool (blue).",
        creativeUse: "Mis-match WB for creative effect (e.g., cooling down a day shot).",
        tool: "Color Temp Simulator", toolTip: "Slide to 3000K for Tungsten look."
    },
    "White Balance": {
        definition: "The process of removing color casts so white objects appear white.",
        howItWorks: "It counteracts the color temperature of the light source.",
        creativeUse: "Use 'Shade' WB at sunset to make the golden tones even stronger.",
        tool: "Color Temp Simulator", toolTip: "Adjust Kelvin to neutralize the cast."
    },
    "Three-Point Lighting": { 
        definition: "Standard lighting setup: Key, Fill, and Back light.", 
        howItWorks: "Key illuminates, Fill softens shadows, Back separates from background.",
        creativeUse: "Remove the Fill light for a dramatic, moody 'Rembrandt' look.",
        tool: "Three-Point Lighting Sim", toolTip: "Toggle lights on/off."
    },
    "Key Light": {
        definition: "The primary light source in a scene.",
        howItWorks: "It creates the main shadows and defines the form of the subject.",
        creativeUse: "Positioning it high and to the side creates classic portrait modeling.",
        tool: "Three-Point Lighting Sim", toolTip: "Turn off Fill and Back to see just the Key."
    },
    "Fill Light": {
        definition: "Secondary light used to reduce the contrast of shadows.",
        howItWorks: "Usually placed opposite the Key light and is less intense.",
        creativeUse: "Use a reflector instead of a light for a natural fill outdoors.",
        tool: "Three-Point Lighting Sim", toolTip: "Toggle the Fill light."
    },
    "Rim Light": {
        definition: "Light placed behind the subject to illuminate the edges.",
        howItWorks: "It creates a glowing outline that separates the subject from a dark background.",
        creativeUse: "Essential for dark hair against a dark background.",
        tool: "Three-Point Lighting Sim", toolTip: "Toggle the Back Light."
    },
    "Rembrandt Lighting": {
        definition: "A lighting technique characterized by a triangle of light on the shadowed cheek.",
        howItWorks: "Created by placing the key light at a 45-degree angle and high up.",
        creativeUse: "Creates a classic, painterly, and dramatic portrait.",
        tool: "Three-Point Lighting Sim", toolTip: "Use Key Light only and look for shadow shape."
    },
    "Low Key": {
        definition: "A style of photography that uses predominantly dark tones and high contrast.",
        howItWorks: "Uses minimal lighting and focuses on form and outline.",
        creativeUse: "Great for dramatic portraits or mystery.",
        tool: "Three-Point Lighting Sim", toolTip: "Disable Fill Light for high contrast."
    },
    "High Key": {
        definition: "A style of photography that uses predominantly bright tones and low contrast.",
        howItWorks: "Uses lots of fill light to eliminate shadows.",
        creativeUse: "Great for beauty, fashion, and upbeat product photography.",
        tool: "Three-Point Lighting Sim", toolTip: "Use all lights at high power."
    },
    "Zone System": { 
        definition: "A technique to determine optimal film exposure and development.", 
        howItWorks: "Divides brightness into 11 zones from 0 (Black) to X (White). Zone V is Middle Grey.",
        creativeUse: "Place skin tones in Zone VI to ensure they are bright enough.",
        tool: "Zone System Mapper", toolTip: "Use False Color mode."
    },
    "False Color": {
        definition: "A visualization tool that maps luminance values to specific colors.",
        howItWorks: "Allows you to see exposure levels of different areas instantly.",
        creativeUse: "Quickly check if skin tones are properly exposed (often pink/green).",
        tool: "Zone System Mapper", toolTip: "Enable False Color toggle."
    },
    "Diffraction": { 
        definition: "Loss of sharpness caused by light bending around aperture blades at high f-stops.", 
        howItWorks: "Occurs when the aperture hole is physically very small (e.g., f/22).",
        creativeUse: "Avoid f/22 unless you need extreme depth of field; f/8-f/11 is usually sharper.",
        tool: "Diffraction Calculator", toolTip: "Observe the Airy Disk size."
    },
    "Airy Disk": {
        definition: "The pattern of light focused by a lens, limited by diffraction.",
        howItWorks: "As aperture shrinks, the disk grows. If it's larger than a pixel, the image softens.",
        creativeUse: "Understanding this helps you find your lens's 'sweet spot'.",
        tool: "Diffraction Calculator", toolTip: "See pixel pitch vs disk size."
    },
    "RGB Curves": { 
        definition: "Adjusting brightness/contrast for individual color channels.", 
        howItWorks: "Altering the Red curve affects Cyan/Red balance.",
        creativeUse: "Lift Blue shadows and lower Blue highlights for a 'Cross Process' look.",
        tool: "RGB Curve Sim", toolTip: "Manipulate individual channels."
    },
    "Contrast": {
        definition: "The difference between the light and dark areas of an image.",
        howItWorks: "High contrast has stark blacks and whites; low contrast is gray and flat.",
        creativeUse: "Use high contrast for bold street photography.",
        tool: "Tone Curve Simulator", toolTip: "Create an S-Curve."
    },
    "ND Filters": { 
        definition: "Neutral Density filters act as sunglasses for the lens.", 
        howItWorks: "They reduce incoming light without changing color.",
        creativeUse: "Allows long exposures (blurring water) even in bright daylight.",
        tool: "ND Filter Lab", toolTip: "Select 'Waterfall' scene."
    },
    "Long Exposure": {
        definition: "Using a slow shutter speed to capture the passage of time.",
        howItWorks: "Requires a tripod. Moving objects become blurred; static objects stay sharp.",
        creativeUse: "Turning choppy water into mist or car lights into trails.",
        tool: "ND Filter Lab", toolTip: "Increase stop density."
    },
    "Focus Peaking": { 
        definition: "A live focus assist tool.", 
        howItWorks: "Highlights high-contrast edges in a bright color (red/yellow).",
        creativeUse: "Essential for manual focus lenses or macro work.",
        tool: "Focus Peaking Sim", toolTip: "Adjust focus distance."
    },
    "Inverse Square Law": { 
        definition: "Light intensity drops off rapidly as distance increases.", 
        howItWorks: "Double distance = 1/4 light intensity.",
        creativeUse: "Place light close for rapid fall-off (moody). Place far for even light.",
        tool: "Inverse Square Law Sim", toolTip: "Move light slider."
    },
    "Dynamic Range": { 
        definition: "The range from darkest shadow to brightest highlight a camera can capture.", 
        howItWorks: "If the scene range exceeds sensor range, clipping occurs.",
        creativeUse: "Shoot RAW to preserve more dynamic range.",
        tool: "Dynamic Range Sim", toolTip: "Compare JPEG vs RAW."
    },
    "Shadows & Highlights": {
        definition: "The darkest and brightest parts of an image.",
        howItWorks: "Digital sensors struggle more with highlights; film struggles with shadows.",
        creativeUse: "Recovering shadows in post can reveal hidden details.",
        tool: "Light Panel Simulator", toolTip: "Adjust shadow/highlight sliders."
    },
    "Sensor Size": { 
        definition: "The physical dimensions of the image sensor.", 
        howItWorks: "Larger sensors capture more light and allow shallower depth of field.",
        creativeUse: "Full Frame for low light/portraits. Crop sensor for wildlife reach.",
        tool: "Sensor Size Simulator", toolTip: "Switch between FF and Micro 4/3."
    },
    "Crop Factor": { 
        definition: "The magnification effect of using a smaller sensor.", 
        howItWorks: "A 50mm lens on an APS-C (1.5x) sensor behaves like a 75mm lens.",
        creativeUse: "Advantageous for bird photography as it extends lens reach.",
        tool: "FoV Comparator", toolTip: "Observe the framing change."
    },
    "Pixel Pitch": {
        definition: "The distance between the center of one pixel to the next on a sensor.",
        howItWorks: "Larger pixels gather more light (less noise) but lower resolution.",
        creativeUse: "Important for understanding diffraction limits and low light performance.",
        tool: "Diffraction Calculator", toolTip: "See micron value change with MP."
    },
    "Keystoning": { 
        definition: "Parallel lines appearing to converge due to camera angle.", 
        howItWorks: "Often happens when tilting the camera up at a building.",
        creativeUse: "Correct it to make architecture look majestic and upright.",
        tool: "Keystoning Simulator", toolTip: "Apply perspective correction."
    },
    "Dutch Angle": { 
        definition: "Tilting the horizon line of the camera.", 
        howItWorks: "Breaks the standard horizontal alignment.",
        creativeUse: "Creates a sense of unease, tension, or dynamic action.",
        tool: "Dutch Angle Simulator", toolTip: "Tilt the slider."
    },
    "Hyperfocal Distance": { 
        definition: "The focus point that provides the maximum depth of field.", 
        howItWorks: "Everything from half this distance to infinity will be sharp.",
        creativeUse: "Crucial for landscape photography to keep foreground and mountains sharp.",
        tool: "DoF Visualizer", toolTip: "Look for the yellow marker."
    },
    "Tone Curve": { 
        definition: "A graph controlling the brightness of input tones vs output tones.", 
        howItWorks: "Dragging the line up brightens; down darkens.",
        creativeUse: "Create an 'S-Curve' for punchy contrast.",
        tool: "Tone Curve Simulator", toolTip: "Manipulate the curve points."
    },
    "Split Toning": { 
        definition: "Color grading highlights and shadows separately.", 
        howItWorks: "Adds color tint to specific luminance ranges.",
        creativeUse: "Teal shadows and Orange highlights is a blockbuster movie look.",
        tool: "Split Toning Simulator", toolTip: "Adjust hue sliders."
    },
    "Color Grading": {
        definition: "The process of altering and enhancing the color of an image.",
        howItWorks: "Can be corrective or artistic (stylized).",
        creativeUse: "Give an image a 'vintage' feel by warming highlights and lifting blacks.",
        tool: "Darkroom", toolTip: "Match the target grade."
    },
    "Chromatic Aberration": { 
        definition: "Color fringing along high-contrast edges.", 
        howItWorks: "Lens fails to focus all colors to the same point.",
        creativeUse: "Usually a defect to remove, but sometimes added for retro glitch aesthetics.",
        tool: "Lens Correction (General)", toolTip: "Concept explained in optics."
    },
    "Bokeh": { 
        definition: "The aesthetic quality of out-of-focus blur.", 
        howItWorks: "Created by aperture blades and lens design.",
        creativeUse: "Turn streetlights into beautiful glowing orbs behind a portrait.",
        tool: "Aperture Simulator", toolTip: "Use 'Night' scene."
    },
    "Gobos": { 
        definition: "Objects placed in front of light to cast shadows.", 
        howItWorks: "Go-Between Object. Can be blinds, leaves, or cutouts.",
        creativeUse: "Add visual interest to a plain wall behind a subject.",
        tool: "Gobos Simulator", toolTip: "Select 'Blinds' pattern."
    },
    "Golden Hour": { 
        definition: "First/last hour of sunlight.", 
        howItWorks: "Sun is low, creating soft, warm, diffused light.",
        creativeUse: "The 'magic' time for outdoor portraits.",
        tool: "Golden Hour Simulator", toolTip: "Set time to late afternoon."
    },
    "Blue Hour": { 
        definition: "Twilight period before sunrise or after sunset.", 
        howItWorks: "Sky is deep blue, city lights are warm.",
        creativeUse: "Perfect for cityscapes to balance artificial light with natural sky.",
        tool: "Golden Hour Simulator", toolTip: "Set time to dusk."
    },
    "Flash Sync": { 
        definition: "Timing of the flash firing relative to shutter.", 
        howItWorks: "Rear Curtain fires at the end of exposure.",
        creativeUse: "Rear Curtain creates light trails *behind* a moving car.",
        tool: "Flash Sync Simulator", toolTip: "Switch to Rear Curtain."
    },
    "Film Grain": { 
        definition: "Texture caused by silver halide particles in film.", 
        howItWorks: "Digital noise is different (undesirable), but grain is often aesthetic.",
        creativeUse: "Add grain to monochrome photos for a gritty, journalistic look.",
        tool: "Effects Panel Sim", toolTip: "Increase grain slider."
    },
    "HSL": { 
        definition: "Hue, Saturation, Luminance.", 
        howItWorks: "Allows adjustment of specific color ranges independently.",
        creativeUse: "Desaturate only the oranges to fix skin tones, or shift blue sky to teal.",
        tool: "HSL Slider Simulator", toolTip: "Adjust color channels."
    },
    "Color Harmony": {
        definition: "Pleasing arrangement of colors (e.g., complementary, analogous).",
        howItWorks: "Based on the color wheel relationships.",
        creativeUse: "Use a palette generator to plan wardrobe and location colors.",
        tool: "Chroma Lab", toolTip: "Extract palette from image."
    },
    "Symmetry": { 
        definition: "One side of the image mirrors the other.", 
        howItWorks: "Creates balance and formality.",
        creativeUse: "Reflections in water are the perfect opportunity for symmetry.",
        tool: "Composition Simulators", toolTip: "Align with the center guide."
    },
    "Visual Weight": { 
        definition: "The power of an element to draw the eye.", 
        howItWorks: "Contrast, size, faces, and text have high visual weight.",
        creativeUse: "Balance a large, light object with a small, dark object.",
        tool: "Balance Simulator", toolTip: "See the seesaw effect."
    },
    "Negative Space": {
        definition: "The empty area surrounding the main subject.",
        howItWorks: "It provides breathing room and emphasizes the subject.",
        creativeUse: "Use a vast sky to make a lone figure look isolated.",
        tool: "Negative Space Simulator", toolTip: "Zoom out to increase space."
    },
    "Framing": {
        definition: "Using scene elements to create a frame within the photo.",
        howItWorks: "Shooting through windows, doors, or branches.",
        creativeUse: "Adds depth and directs the eye to the subject.",
        tool: "Framing Simulator", toolTip: "Add a natural frame."
    },
    "Clarity": {
        definition: "Contrast applied specifically to mid-tones.",
        howItWorks: "Enhances texture and 'crunch' without affecting overall exposure much.",
        creativeUse: "Great for architectural details or gritty portraits; avoid on smooth skin.",
        tool: "Clarity & Sharpen Sim", toolTip: "Increase Clarity slider."
    },
    "Sharpening": {
        definition: "Enhancing the contrast of edges.",
        howItWorks: "Makes boundaries between objects distinct.",
        creativeUse: "Essential for digital images to counter sensor anti-aliasing filters.",
        tool: "Clarity & Sharpen Sim", toolTip: "Increase Sharpen slider."
    },
    "Vignette": {
        definition: "Darkening of image corners.",
        howItWorks: "Can happen naturally with lenses or added in post.",
        creativeUse: "Draws attention to the center of the frame.",
        tool: "Effects Panel Sim", toolTip: "Apply vignette."
    },
    "Silhouette": {
        definition: "Subject appears dark against a bright background.",
        howItWorks: "Expose for the bright background, leaving the subject underexposed.",
        creativeUse: "Simplifies the subject into a graphic shape.",
        tool: "Exposure Simulators", toolTip: "Use Spot Metering on the sky."
    },
    "Motion Blur": {
        definition: "Streaking of moving objects due to slow shutter speed.",
        howItWorks: "The sensor records the object's path during exposure.",
        creativeUse: "Convey speed in car photography or smooth flow in waterfalls.",
        tool: "Shutter Speed Simulator", toolTip: "Use slow shutter speed."
    },
    "Panning": {
        definition: "Following a moving subject with the camera while shooting.",
        howItWorks: "Keeps the subject relatively sharp while blurring the background.",
        creativeUse: "Classic technique for race cars or cyclists.",
        tool: "Shutter Speed Simulator", toolTip: "Select 'Action Pan' mode."
    },
    "Macro Photography": {
        definition: "Close-up photography of small subjects.",
        howItWorks: "Requires specialized lenses to achieve 1:1 magnification.",
        creativeUse: "Reveal textures invisible to the naked eye.",
        tool: "Focus Peaking Sim", toolTip: "Use Peaking to find thin focus plane."
    },
    "Astrophotography": {
        definition: "Photography of astronomical objects and the night sky.",
        howItWorks: "Requires long exposures, high ISO, and wide apertures.",
        creativeUse: "Capture the Milky Way.",
        tool: "Exposure Simulators", toolTip: "Experiment with high ISO/slow shutter."
    },
    "Monochrome": {
        definition: "Image in a single color, usually black and white.",
        howItWorks: "Removes color distraction, focusing on light, texture, and form.",
        creativeUse: "Timeless look for portraits and street photography.",
        tool: "Split Toning Simulator", toolTip: "View base grayscale image."
    },
    "Flat Lay": {
        definition: "Shooting items from directly above (90 degrees).",
        howItWorks: "Eliminates depth perspective, focusing on arrangement.",
        creativeUse: "Popular for food and product photography.",
        tool: "Composition Simulators", toolTip: "Imagine grid lines for arrangement."
    },
    "Leading Lines": {
        definition: "Lines in the image that guide the eye to the subject.",
        howItWorks: "Roads, fences, or shadows act as arrows.",
        creativeUse: "Create strong depth and visual flow.",
        tool: "Composition Simulators", toolTip: "Use perspective lines."
    }
};

export const FUN_FACTS = [
    "The first digital camera was invented by Kodak in 1975. It weighed 8 pounds and took 23 seconds to record a 0.01 megapixel image.",
    "The most expensive photograph ever sold is 'Le Violon d'Ingres' by Man Ray, fetching $12.4 million in 2022.",
    "The 'Golden Hour' isn't always an hour. Near the equator, it might only last 20 minutes, while in Scandinavia, it can last all night in summer.",
    "The term 'megapixel' stands for one million pixels. A 24MP camera captures 24 million distinct points of data.",
    "Early flash powder (magnesium) was explosive and dangerous. Photographers were occasionally injured when taking indoor shots.",
    "The first color photograph was taken in 1861 by James Clerk Maxwell, projecting three black-and-white slides through red, green, and blue filters.",
    "The 'Daguerreotype' was the first commercially successful photographic process, introduced in 1839. It created a unique image on silver-plated copper.",
    "The longest exposure ever taken is currently ongoing. The Millennium Camera in Tucson, Arizona is set to expose for 1,000 years (2023-3023).",
    "Kodachrome film was so complex to develop that only a few labs in the world could process it. It was discontinued in 2009.",
    "The human eye has a dynamic range of about 20-24 stops, while the best modern cameras capture around 14-15 stops.",
    "In cinema, the 'shutter angle' is used instead of shutter speed. A 180-degree shutter is standard for natural motion blur.",
    "Ansel Adams developed the 'Zone System' to translate perceived light into specific print densities, giving him ultimate control over contrast.",
    "The 'Leica' brand name comes from 'Leitz Camera'. Oskar Barnack invented the 35mm format we still use today to test cinema film stock.",
    "The world's largest camera lens was built in 2006. It weighed 564 pounds and was designed for a wildlife photographer.",
    "Before digital sensors, ISO was called ASA (American Standards Association). The scale numbers (100, 200, 400) remained the same."
];

export interface QuizQuestion {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export const CONCEPT_QUIZZES: Record<string, QuizQuestion> = {
    "Aperture": {
        question: "Which f-stop setting will let in the MOST light?",
        options: ["f/1.4", "f/8", "f/22"],
        correctIndex: 0,
        explanation: "Lower f-numbers represent wider openings. f/1.4 is a very wide aperture."
    },
    "Shutter Speed": {
        question: "Which shutter speed is best for freezing a fast-moving car?",
        options: ["1/30 sec", "1/1000 sec", "1 sec"],
        correctIndex: 1,
        explanation: "1/1000s is very fast, allowing the sensor to capture a split second without blur."
    },
    "ISO": {
        question: "What is the main side effect of raising your ISO too high?",
        options: ["Motion Blur", "Digital Noise (Grain)", "Darker Image"],
        correctIndex: 1,
        explanation: "Amplifying the sensor signal introduces static-like digital noise."
    },
    "Depth of Field": {
        question: "Which factor does NOT affect Depth of Field?",
        options: ["Aperture", "Focal Length", "Shutter Speed"],
        correctIndex: 2,
        explanation: "Shutter speed controls motion blur and exposure time, but has no effect on focus depth."
    },
    "Golden Hour": {
        question: "When does the Golden Hour occur?",
        options: ["At noon", "Just after sunrise / before sunset", "Midnight"],
        correctIndex: 1,
        explanation: "It creates soft, warm light when the sun is low on the horizon."
    },
    "Rule of Thirds": {
        question: "Where should you place your subject for a 'Rule of Thirds' composition?",
        options: ["Dead center", "On the intersections of the 3x3 grid", "In the bottom corner"],
        correctIndex: 1,
        explanation: "Placing subjects off-center on these intersections creates visual tension and interest."
    },
    "White Balance": {
        question: "If your photo looks too blue (cool), what should you do?",
        options: ["Lower the Kelvin (e.g. 3000K)", "Raise the Kelvin (e.g. 7000K)", "Decrease ISO"],
        correctIndex: 1,
        explanation: "Raising the Kelvin value adds warmth (orange) to counteract the blue."
    },
    "Histogram": {
        question: "If the histogram graph is bunched up against the right side, the image is...",
        options: ["Underexposed (Too Dark)", "Overexposed (Too Bright)", "Perfectly Balanced"],
        correctIndex: 1,
        explanation: "The right side represents highlights. Hitting the wall means 'clipping' whites."
    },
    "Bokeh": {
        question: "How do you achieve maximum Bokeh (background blur)?",
        options: ["Use f/22 and stand far away", "Use f/1.8 and get close to subject", "Use a wide angle lens"],
        correctIndex: 1,
        explanation: "Wide aperture (low f-stop) + close focus distance = shallowest depth of field."
    },
    "Focal Length": {
        question: "Which lens type 'compresses' the background, making it look closer?",
        options: ["Wide Angle (16mm)", "Standard (50mm)", "Telephoto (200mm)"],
        correctIndex: 2,
        explanation: "Telephoto lenses narrow the field of view, creating a compression effect."
    },
    "Airy Disk": {
        question: "The Airy Disk is related to which optical phenomenon?",
        options: ["Distortion", "Diffraction", "Vignetting"],
        correctIndex: 1,
        explanation: "As the aperture closes, light waves interfere, spreading point sources into disks."
    },
    "Astrophotography": {
        question: "What is crucial for capturing stars without trails?",
        options: ["Fast shutter speed", "Rule of 500", "Small aperture"],
        correctIndex: 1,
        explanation: "The Rule of 500 helps calculate the max exposure time before earth's rotation causes trails."
    },
    "Blue Hour": {
        question: "What lighting characteristic defines the Blue Hour?",
        options: ["High contrast shadows", "Deep blue sky with warm artificial lights", "Golden sunlight"],
        correctIndex: 1,
        explanation: "Occurs just before sunrise or after sunset, providing a cool ambient light."
    },
    "Chromatic Aberration": {
        question: "What does Chromatic Aberration look like?",
        options: ["Dark corners", "Color fringing (purple/green) on edges", "Blurry center"],
        correctIndex: 1,
        explanation: "It happens when a lens fails to focus all colors to the same convergence point."
    },
    "Clarity": {
        question: "Which part of the image does the 'Clarity' slider primarily affect?",
        options: ["Overall brightness", "Midtone contrast", "Color saturation"],
        correctIndex: 1,
        explanation: "Clarity adds punch to textures by boosting contrast in the midtones."
    },
    "Color Grading": {
        question: "What is the main purpose of Color Grading?",
        options: ["Correcting white balance", "Stylizing the image for mood", "Removing noise"],
        correctIndex: 1,
        explanation: "Unlike color correction (fixing), grading is a creative choice to convey emotion."
    },
    "Color Harmony": {
        question: "Which color scheme uses colors opposite each other on the wheel?",
        options: ["Analogous", "Monochromatic", "Complementary"],
        correctIndex: 2,
        explanation: "Complementary colors (like Blue/Orange) create high contrast and vibrancy."
    },
    "Color Temperature": {
        question: "A low Kelvin value (e.g., 2500K) represents what color of light?",
        options: ["Blue (Cool)", "White (Neutral)", "Orange (Warm)"],
        correctIndex: 2,
        explanation: "Lower Kelvin values correspond to warm light sources like candles or tungsten bulbs."
    },
    "Compression (Lens)": {
        question: "How does a telephoto lens affect the relationship between subject and background?",
        options: ["Separates them further", "Makes them appear closer together", "Distorts the edges"],
        correctIndex: 1,
        explanation: "Telephoto lenses 'flatten' the image, making distant objects appear larger relative to the foreground."
    },
    "Contrast": {
        question: "A 'Low Key' image is characterized by:",
        options: ["High brightness", "Dominance of shadows and high contrast", "Low contrast gray tones"],
        correctIndex: 1,
        explanation: "Low Key lighting uses shadow and contrast to create drama."
    },
    "Crop Factor": {
        question: "If you put a 50mm lens on a 1.5x crop sensor, what is the effective focal length?",
        options: ["35mm", "50mm", "75mm"],
        correctIndex: 2,
        explanation: "50mm x 1.5 = 75mm equivalent field of view."
    },
    "Diffraction": {
        question: "At which aperture setting is diffraction most likely to soften your image?",
        options: ["f/5.6", "f/11", "f/22"],
        correctIndex: 2,
        explanation: "Very small apertures (high f-numbers) cause light waves to bend and interfere, reducing sharpness."
    },
    "Dutch Angle": {
        question: "What emotion does a Dutch Angle typically convey?",
        options: ["Stability", "Peace", "Unease or Tension"],
        correctIndex: 2,
        explanation: "Tilting the horizon creates a sense of disorientation or dynamic action."
    },
    "Dynamic Range": {
        question: "When a sensor 'clips' the highlights, what happens?",
        options: ["Colors become saturated", "Detail is lost to pure white", "The image becomes noisy"],
        correctIndex: 1,
        explanation: "Clipping means the data has exceeded the maximum brightness value the sensor can record."
    },
    "Exposure Triangle": {
        question: "If you increase Shutter Speed (make it faster), what must you do to maintain exposure?",
        options: ["Close Aperture or Lower ISO", "Open Aperture or Raise ISO", "Change White Balance"],
        correctIndex: 1,
        explanation: "A faster shutter lets in less light, so you must compensate by letting in more (Aperture) or boosting sensitivity (ISO)."
    },
    "False Color": {
        question: "What is False Color used for in video/cinema?",
        options: ["Creative filters", "Checking exposure levels accurately", "Focus assistance"],
        correctIndex: 1,
        explanation: "It maps luminance values to colors (e.g., pink for skin tone) to verify exposure objectively."
    },
    "Fill Light": {
        question: "Where is the Fill Light typically placed?",
        options: ["Behind the subject", "Opposite the Key Light", "Directly above"],
        correctIndex: 1,
        explanation: "It fills in the shadows created by the Key Light."
    },
    "Film Grain": {
        question: "Why might a photographer add grain to a digital photo?",
        options: ["To increase sharpness", "To simulate a vintage/analog aesthetic", "To fix color issues"],
        correctIndex: 1,
        explanation: "Grain adds texture and can make an image feel more organic or timeless."
    },
    "Flash Sync": {
        question: "What happens if you use a shutter speed faster than your camera's Sync Speed?",
        options: ["The photo is overexposed", "A black band appears on the image", "The flash won't fire"],
        correctIndex: 1,
        explanation: "The shutter curtain will start closing before the flash finishes, blocking part of the sensor."
    },
    "Flat Lay": {
        question: "What camera angle is used for a Flat Lay?",
        options: ["45 degrees", "Eye level", "90 degrees (Top Down)"],
        correctIndex: 2,
        explanation: "Flat lays are shot directly from above to eliminate depth perspective."
    },
    "Focus Peaking": {
        question: "How does Focus Peaking help you?",
        options: ["It automatically focuses the lens", "It highlights in-focus edges with color", "It brightens the image"],
        correctIndex: 1,
        explanation: "It visualizes the plane of focus by detecting high contrast edges."
    },
    "Framing": {
        question: "What is the purpose of 'Framing within a frame'?",
        options: ["To block the light", "To direct the viewer's eye to the subject", "To blur the background"],
        correctIndex: 1,
        explanation: "Using foreground elements to frame the subject adds depth and focus."
    },
    "Gobos": {
        question: "What does a Gobo do?",
        options: ["Reflects light", "Blocks light to create shadows/patterns", "Diffuses light"],
        correctIndex: 1,
        explanation: "Go-Betweens are placed between light and subject to cast creative shadows."
    },
    "High Key": {
        question: "High Key photography creates what kind of mood?",
        options: ["Moody and dark", "Light, airy, and optimistic", "Gritty and textured"],
        correctIndex: 1,
        explanation: "It uses bright tones and low contrast."
    },
    "HSL": {
        question: "To turn a blue sky teal, which HSL slider would you adjust?",
        options: ["Hue", "Saturation", "Luminance"],
        correctIndex: 0,
        explanation: "Changing the Hue of the Blue channel shifts the color itself."
    },
    "Hyperfocal Distance": {
        question: "Focusing at the Hyperfocal Distance ensures:",
        options: ["Maximum background blur", "Maximum depth of field (sharpness from near to infinity)", "Sharpest possible subject"],
        correctIndex: 1,
        explanation: "It is the specific focus point that maximizes the acceptable sharp range."
    },
    "Inverse Square Law": {
        question: "If you move a light source 2x further away, how much intensity remains?",
        options: ["50% (1/2)", "25% (1/4)", "10% (1/10)"],
        correctIndex: 1,
        explanation: "Intensity is inversely proportional to the square of the distance (1/2² = 1/4)."
    },
    "Key Light": {
        question: "In a standard setup, the Key Light is:",
        options: ["The brightest/main light", "The backlight", "The background light"],
        correctIndex: 0,
        explanation: "It provides the primary illumination and defines shadows."
    },
    "Keystoning": {
        question: "What causes vertical lines in buildings to look like they are falling backwards?",
        options: ["Wide aperture", "Tilting the camera upwards", "Slow shutter speed"],
        correctIndex: 1,
        explanation: "Perspective distortion occurs when the sensor plane is not parallel to the subject."
    },
    "Leading Lines": {
        question: "The primary goal of Leading Lines is to:",
        options: ["Divide the frame", "Guide the viewer's eye towards the subject", "Create symmetry"],
        correctIndex: 1,
        explanation: "Lines like roads or fences act as visual arrows pointing to the focal point."
    },
    "Long Exposure": {
        question: "Which filter is often needed for Long Exposures during the day?",
        options: ["UV Filter", "Polarizer", "ND (Neutral Density) Filter"],
        correctIndex: 2,
        explanation: "An ND filter blocks light, allowing you to keep the shutter open longer without overexposure."
    },
    "Low Key": {
        question: "Low Key lighting emphasizes:",
        options: ["Bright colors", "Shadows and contours", "Even illumination"],
        correctIndex: 1,
        explanation: "It uses darkness to reveal form and create mood."
    },
    "Macro Photography": {
        question: "A true Macro lens creates a magnification ratio of at least:",
        options: ["1:1", "1:2", "1:10"],
        correctIndex: 0,
        explanation: "The subject appears life-size on the image sensor."
    },
    "Metering Modes": {
        question: "Spot Metering measures light from:",
        options: ["The entire frame average", "The center and surrounding area", "A single small point"],
        correctIndex: 2,
        explanation: "It allows for precise exposure of a specific part of the scene, ignoring the rest."
    },
    "Monochrome": {
        question: "What becomes more important when color is removed (B&W)?",
        options: ["White Balance", "Texture, Tonal Contrast, and Form", "Saturation"],
        correctIndex: 1,
        explanation: "Without color contrast, the image relies on light/dark contrast and structure."
    },
    "Motion Blur": {
        question: "Motion blur is caused by:",
        options: ["Subject movement during exposure", "Missed focus", "Low ISO"],
        correctIndex: 0,
        explanation: "If the subject moves while the shutter is open, it records as a streak."
    },
    "Negative Space": {
        question: "Using lots of negative space creates a sense of:",
        options: ["Chaos", "Isolation or Minimalism", "Action"],
        correctIndex: 1,
        explanation: "Empty space emphasizes the subject by giving the eye nowhere else to look."
    },
    "ND Filters": {
        question: "An ND Filter affects the image by:",
        options: ["Changing colors", "Reducing light intensity", "Softening focus"],
        correctIndex: 1,
        explanation: "It acts like sunglasses for the lens, reducing exposure without altering color."
    },
    "Panning": {
        question: "When panning, you should:",
        options: ["Hold the camera still", "Move the camera at the same speed as the subject", "Move opposite to the subject"],
        correctIndex: 1,
        explanation: "Matching speed keeps the subject sharp while the background blurs."
    },
    "Pixel Pitch": {
        question: "Larger Pixel Pitch typically results in:",
        options: ["Higher resolution", "Better low-light performance", "More noise"],
        correctIndex: 1,
        explanation: "Larger pixels can gather more photons, improving signal-to-noise ratio."
    },
    "Reciprocity": {
        question: "The Law of Reciprocity states that Exposure = Intensity x _____",
        options: ["Distance", "Time", "ISO"],
        correctIndex: 1,
        explanation: "Total exposure depends on how bright the light is and how long it hits the sensor."
    },
    "Rembrandt Lighting": {
        question: "The signature of Rembrandt lighting is:",
        options: ["Flat, even light", "A triangle of light on the shadowed cheek", "Silhouette"],
        correctIndex: 1,
        explanation: "It mimics the style of the painter Rembrandt, creating depth and drama."
    },
    "Rim Light": {
        question: "Rim lighting helps to:",
        options: ["Separate the subject from the background", "Fill in shadows", "Color balance the scene"],
        correctIndex: 0,
        explanation: "It creates a highlight outline around the subject."
    },
    "RGB Curves": {
        question: "Raising the Red curve in the shadows adds Red. Lowering it adds:",
        options: ["Green", "Blue", "Cyan"],
        correctIndex: 2,
        explanation: "The opposite of Red on the digital color wheel is Cyan."
    },
    "Sensor Size": {
        question: "Which sensor size generally offers the shallowest Depth of Field (at same framing)?",
        options: ["Micro 4/3", "APS-C", "Full Frame"],
        correctIndex: 2,
        explanation: "Larger sensors require longer focal lengths or closer distances for the same framing, reducing DoF."
    },
    "Shadows & Highlights": {
        question: "In digital photography, it is usually harder to recover detail from:",
        options: ["Clipped Highlights (Pure White)", "Crushed Shadows (Pure Black)"],
        correctIndex: 0,
        explanation: "Once a pixel hits 100% white, there is no data left. Shadows often retain some noise-heavy data."
    },
    "Sharpening": {
        question: "Sharpening works by:",
        options: ["Increasing resolution", "Increasing contrast at edges", "Blurring textures"],
        correctIndex: 1,
        explanation: "It creates the illusion of detail by darkening/lightening the borders of objects."
    },
    "Silhouette": {
        question: "To create a silhouette, you must expose for the:",
        options: ["Subject", "Background (Brightest part)", "Shadows"],
        correctIndex: 1,
        explanation: "Exposing for the bright background forces the subject into darkness."
    },
    "Split Toning": {
        question: "Split Toning involves:",
        options: ["Splitting the image in half", "Applying different colors to shadows and highlights", "Removing color"],
        correctIndex: 1,
        explanation: "Commonly used for the 'Teal and Orange' look."
    },
    "Symmetry": {
        question: "Symmetrical compositions are often found in:",
        options: ["Action sports", "Architecture and reflections", "Candid street photography"],
        correctIndex: 1,
        explanation: "Man-made structures and water reflections naturally provide symmetry."
    },
    "Three-Point Lighting": {
        question: "Which light is NOT part of standard 3-point lighting?",
        options: ["Key Light", "Ring Light", "Back Light"],
        correctIndex: 1,
        explanation: "Ring lights are specialized. The standard trio is Key, Fill, Back."
    },
    "Tone Curve": {
        question: "An 'S-Curve' adjustment typically:",
        options: ["Lowers contrast", "Increases contrast", "Inverts colors"],
        correctIndex: 1,
        explanation: "It darkens shadows and brightens highlights, stretching the tonal range."
    },
    "Vignette": {
        question: "A vignette helps to:",
        options: ["Brighten the corners", "Focus attention on the center", "Sharpen the edges"],
        correctIndex: 1,
        explanation: "Darkening the periphery pushes the viewer's eye inward."
    },
    "Visual Weight": {
        question: "Which element typically carries the MOST visual weight?",
        options: ["Empty space", "A human face/eyes", "A blurry background"],
        correctIndex: 1,
        explanation: "Humans are biologically wired to look at faces first."
    },
    "Zone System": {
        question: "In the Zone System, Zone V represents:",
        options: ["Pure Black", "Middle Grey (18%)", "Pure White"],
        correctIndex: 1,
        explanation: "Zone V is the anchor point for standard exposure."
    }
};

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
