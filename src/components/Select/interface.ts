import React from 'react';

export interface ToolOptionItem {
  id: number;
  label: string;
  type: number;
  value: number;
}

export interface ToolOptions extends Array<ToolOptionItem> {}

export interface ToolDressingOptionItem {
  name: string;
  value: number;
  toolId: number;
}

export interface ToolDressingOptions extends Array<ToolDressingOptionItem> {}

export interface SelectComponentProps {
  label: string;
  name: string;
  options: ToolOptions;
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | number;
}
