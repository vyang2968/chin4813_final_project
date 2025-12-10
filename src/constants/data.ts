import { Dish } from '@/types';

export const DISHES: Record<string, Dish> = {
  course1: {
    id: 'c1',
    stage: 'course1',
    name: 'Steamed Dumplings',
    description: 'A delicate start to the meal.',
    image: '/assets/dish1.png',
    info: 'These dumplings represent the beginning of our journey. Wrapped in delicate dough, they hide a flavorful filling, much like the hidden stories we are about to uncover...',
  },
  course2: {
    id: 'c2',
    stage: 'course2',
    name: 'Egg Drop Soup',
    description: 'Warm and comforting.',
    image: '/assets/dish2.png',
    info: 'The soup courses flows like a river. It warms the soul and prepares the palate for the richness to come. Its golden color symbolizes prosperity.',
  },
  course3: {
    id: 'c3',
    stage: 'course3',
    name: 'Kung Pao Chicken',
    description: 'Spicy and bold.',
    image: '/assets/dish3.png',
    info: 'The main course brings heat and energy. A classic dish known for its bold flavors and peanuts, representing the complex textures of life.',
  },
  course4: {
    id: 'c4',
    stage: 'course4',
    name: 'Mooncake',
    description: 'A sweet ending.',
    image: '/assets/dish4.png',
    info: 'We end with a Mooncake, a symbol of reunion and wholeness. It reminds us to cherish the time spent together at this table.',
  },
};

export const INTRO_TEXT = "Welcome to our table. Tonight, we serve not just food, but stories. Sit back, relax, and let the meal unfold.";
export const CLOSING_TEXT = "Thank you for dining with us. We hope you leave with a full stomach and a full heart.";
