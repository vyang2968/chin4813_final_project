export type Stage = 'menu' | 'intro' | 'course1' | 'course2' | 'course3' | 'course4' | 'closing';

export interface Dish {
  id: string;
  stage: Stage;
  name: string;
  description: string;
  image: string; // path to asset
  info: React.ReactNode;
}

export interface MenuItem {
  label: string;
  stage: Stage;
}
