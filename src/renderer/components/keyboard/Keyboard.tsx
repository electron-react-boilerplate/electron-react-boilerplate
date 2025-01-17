/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import React from 'react';
import './style.css';

interface IKeyboard {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
}

export default function Keyboard({
  color1,
  color2,
  color3,
  color4,
}: IKeyboard) {
  return (
    <div className="keyboard">
      <div className="row">
        <button className="key gradient-1" style={{ '--color1': color1, '--color2': color1 }} />
        <button className="key gradient-2" style={{ '--color2': color1, '--color3': color1 }} />
        <button className="key gradient-3" style={{ '--color3': color1, '--color4': color2 }} />
        <button className="key gradient-4" style={{ '--color4': color2, '--color1': color2 }} />
        <button className="key gradient-5" style={{ '--color1': color2, '--color2': color2 }} />
        <button className="key gradient-6" style={{ '--color2': color2, '--color3': color2 }} />
        <button className="key gradient-7" style={{ '--color3': color2, '--color4': color3 }} />
        <button className="key gradient-8" style={{ '--color4': color3, '--color1': color3 }} />
        <button className="key gradient-9" style={{ '--color1': color3, '--color2': color3 }} />
        <button className="key gradient-10" style={{ '--color2': color3, '--color3': color3 }} />
        <button className="key gradient-11" style={{ '--color3': color3, '--color4': color4 }} />
        <button className="key gradient-12" style={{ '--color4': color4, '--color1': color4 }} />
        <button className="key gradient-13" style={{ '--color1': color4, '--color2': color4 }} />
        <button className="key utility gradient-14" style={{ '--color2': color4, '--color3': color4 }} />
      </div>
      <div className="row">
        <button className="key utility gradient-15" style={{ '--color3': color1, '--color4': color1 }} />
        <button className="key gradient-16" style={{ '--color4': color1, '--color1': color1 }} />
        <button className="key gradient-17" style={{ '--color1': color1, '--color2': color2 }} />
        <button className="key gradient-18" style={{ '--color2': color2, '--color3': color2 }} />
        <button className="key gradient-19" style={{ '--color3': color2, '--color4': color2 }} />
        <button className="key gradient-20" style={{ '--color4': color2, '--color1': color2 }} />
        <button className="key gradient-21" style={{ '--color1': color2, '--color2': color3 }} />
        <button className="key gradient-22" style={{ '--color2': color3, '--color3': color3 }} />
        <button className="key gradient-23" style={{ '--color3': color3, '--color4': color3 }} />
        <button className="key gradient-24" style={{ '--color4': color3, '--color1': color3 }} />
        <button className="key gradient-25" style={{ '--color1': color3, '--color2': color4 }} />
        <button className="key gradient-26" style={{ '--color2': color4, '--color3': color4 }} />
        <button className="key gradient-27" style={{ '--color3': color4, '--color4': color4 }} />
        <button className="key gradient-28" style={{ '--color4': color4, '--color1': color4 }} />
      </div>
      <div className="row">
        <button className="key utility gradient-29" style={{ '--color1': color1, '--color2': color1 }} />
        <button className="key gradient-30" style={{ '--color2': color1, '--color3': color1 }} />
        <button className="key gradient-31" style={{ '--color3': color1, '--color4': color2 }} />
        <button className="key gradient-32" style={{ '--color4': color2, '--color1': color2 }} />
        <button className="key gradient-33" style={{ '--color1': color2, '--color2': color2 }} />
        <button className="key gradient-34" style={{ '--color2': color2, '--color3': color2 }} />
        <button className="key gradient-35" style={{ '--color3': color2, '--color4': color3 }} />
        <button className="key gradient-36" style={{ '--color4': color3, '--color1': color3 }} />
        <button className="key gradient-37" style={{ '--color1': color3, '--color2': color3 }} />
        <button className="key gradient-38" style={{ '--color2': color3, '--color3': color3 }} />
        <button className="key gradient-39" style={{ '--color3': color3, '--color4': color4 }} />
        <button className="key gradient-40" style={{ '--color4': color4, '--color1': color4 }} />
        <button className="key gradient-41" style={{ '--color1': color4, '--color2': color4 }} />
        <button className="key utility gradient-42" style={{ '--color2': color4, '--color3': color4 }} />
      </div>
      <div className="row">
        <button className="key utility gradient-43" style={{ '--color3': color1, '--color4': color1 }} />
        <button className="key gradient-44" style={{ '--color4': color1, '--color1': color1 }} />
        <button className="key gradient-45" style={{ '--color1': color1, '--color2': color2 }} />
        <button className="key gradient-46" style={{ '--color2': color2, '--color3': color2 }} />
        <button className="key key-space gradient-47" style={{ '--color3': color2, '--color4': color3 }} />
        <button className="key gradient-48" style={{ '--color4': color3, '--color1': color4 }} />
        <button className="key gradient-49" style={{ '--color1': color4, '--color2': color4 }} />
        <button className="key gradient-50" style={{ '--color2': color4, '--color3': color4 }} />
        <button className="key utility gradient-51" style={{ '--color3': color4, '--color4': color4 }} />
      </div>
    </div>
  );
}
