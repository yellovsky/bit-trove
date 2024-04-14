// global modules
import { applySpacing, type SpacingProps } from '@bit-trove/ui/apply-spacing';
import type { FC, HTMLAttributes } from 'react';

interface BoxProps extends HTMLAttributes<HTMLDivElement>, SpacingProps {}

export const Box: FC<BoxProps> = (props) => <div {...applySpacing()(props)} />;
