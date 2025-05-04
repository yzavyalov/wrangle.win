import { Ref } from "vue";

type ComponentOffsetsVariants = 'default' | 'sideBar' | 'sortOptions' | 'profileMenu';

export interface UseShowComponentOptions {
  variant?: ComponentOffsetsVariants
}
