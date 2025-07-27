import { Ref } from "vue";

export type ComponentOffsetsVariants = 'default' | 'sideBar' | 'sortOptions' | 'profileMenu';

export interface UseShowComponentOptions {
  variant?: ComponentOffsetsVariants
}
