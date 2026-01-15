
export type LessonId = 
  // Exposure
  | 'aperture' | 'shutter' | 'iso' | 'histogram' | 'metering' | 'focal-length' | 'sensor-size' | 'focus-peaking' | 'dynamic-range'
  // Composition
  | 'thirds' | 'leading' | 'symmetry' | 'golden-ratio' | 'framing' | 'negative-space' | 'balance' | 'dutch-angle' | 'keystoning'
  // Lighting
  | 'hard-soft' | 'color-temp' | 'three-point' | 'golden-hour' | 'inverse-square' | 'gobos' | 'flash-sync'
  // Post-Production
  | 'light-panel' | 'tone-curve' | 'split-toning' | 'hsl-slider' | 'clarity-sharpen' | 'effects-panel'
  // Nature Gallery
  | 'gal-nat-land-1' | 'gal-nat-land-2' | 'gal-nat-land-3' | 'gal-nat-land-4'
  | 'gal-nat-wild-2' | 'gal-nat-wild-3' | 'gal-nat-wild-4'
  | 'gal-nat-macro-1' 
  | 'gal-nat-forest-1' | 'gal-nat-astro-1'
  // Human Gallery
  | 'gal-hum-port-1' | 'gal-hum-port-2' | 'gal-hum-port-3' | 'gal-hum-port-4'
  | 'gal-hum-street-1' | 'gal-hum-street-2' | 'gal-hum-street-3'
  | 'gal-hum-sport-1' | 'gal-hum-sport-2' | 'gal-hum-doc-1'
  | 'gal-hum-group-1'
  // Urban & Abstract Gallery
  | 'gal-urb-arch-1' | 'gal-urb-arch-2' | 'gal-urb-arch-3'
  | 'gal-urb-night-2' | 'gal-urb-night-3'
  | 'gal-urb-abs-2'
  | 'gal-urb-min-2' | 'gal-urb-patt-1' | 'gal-urb-food-1'
  // B&W Gallery
  | 'gal-bw-1' | 'gal-bw-2' | 'gal-bw-3' | 'gal-bw-4' | 'gal-bw-5'
  | 'gal-bw-6' | 'gal-bw-8' | 'gal-bw-10';

export interface Lesson {
  id: LessonId;
  title: string;
  description: string;
  longDescription: string;
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  iconName: 'Camera' | 'Frame' | 'Sun' | 'Image' | 'Mountain' | 'Users' | 'Building' | 'Moon' | 'Sliders';
  lessons: Lesson[];
  gradient: string;
  backgroundImage: string;
}

export interface Mission {
    subject: string;
    technique: string;
    constraint: string;
    timestamp?: number;
}
