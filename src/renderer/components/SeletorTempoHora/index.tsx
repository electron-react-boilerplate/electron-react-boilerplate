import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DateHelper } from '@App/helper/DateHelper';
import { EventSeletorTempoHora, ValueSeletorTempoHora } from './type';
import '@App/components/SeletorTempoHora/estilo.css';

interface SeletorTempoHoraProps {
  valor: ValueSeletorTempoHora;
  onChange: (event: EventSeletorTempoHora) => void;
}

export default function SeletorTempoHora(props: SeletorTempoHoraProps) {
  const [focusStyle, setFocusStyle] = useState<Record<string, string>>({});
  const [minutos, setMinutos] = useState<string>('');
  const [horas, setHoras] = useState<string>('');
  const inputMinuts = useRef<HTMLInputElement>(null);
  const { onChange, valor } = props;

  useEffect(() => {
    setMinutos(DateHelper.formatNumberMinuts(valor.minuto));
  }, [valor.minuto]);
  useEffect(() => {
    setHoras(DateHelper.formatNumberHours(valor.hora));
  }, [valor.hora]);

  const obterValorEvento = (
    event: React.ChangeEvent<HTMLInputElement>
  ): number => {
    const { value, maxLength } = event.currentTarget;
    let novoValor = parseInt(value.slice(0, maxLength));
    if (novoValor < 0) novoValor = 0;
    return novoValor;
  };
  const onChangeInputMinuto = useCallback(
    (event) => {
      const minutosInput = obterValorEvento(event);
      onChange({
        valor: {
          hora: valor.hora,
          minuto: minutosInput > 59 ? 59 : minutosInput,
        },
      });
    },
    [onChange, valor.hora]
  );
  const onChangeInputHora = useCallback(
    (event) => {
      onChange({
        valor: {
          hora: obterValorEvento(event),
          minuto: valor.minuto,
        },
      });
    },
    [onChange, valor.minuto]
  );
  function onFocus(): void {
    setFocusStyle({
      border: '1px solid #1976d2',
      outline: '1px solid #1976d2',
    });
  }
  function onBlur(): void {
    setFocusStyle({});
  }
  const colarHorarioInput = (texto: string) => {
    if (/^(2[0-3]|[0-1]?[\d]):[0-5][\d]$/.test(texto)) {
      const [hora, minuto] = texto.split(':');
      onChange({
        valor: {
          hora: parseInt(hora),
          minuto: parseInt(minuto),
        },
      });
    }
    if (/^(2[0-3]|[0-1]?[\d])[0-5][\d]$/.test(texto)) {
      onChange({
        valor: {
          hora: parseInt(texto.substring(0, 2)),
          minuto: parseInt(texto.substring(0, 1)),
        },
      });
    }
  };
  function onClickSpan(): void {
    inputMinuts.current?.focus();
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const elementTarget = event.target as HTMLElement;
    if (elementTarget.tagName.toLocaleLowerCase() === 'input') return;

    event.preventDefault();
    if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
      navigator.clipboard.readText().then(colarHorarioInput);
    }
  };
  return (
    <div
      tabIndex={-1}
      className="CalcularHoraContainer"
      onKeyDown={handleKeyDown}
      style={focusStyle}
    >
      <input
        maxLength={2}
        minLength={1}
        value={horas}
        onChange={onChangeInputHora}
        onFocus={onFocus}
        onBlur={onBlur}
        type="number"
      />
      <span onClick={onClickSpan} aria-hidden="true">
        :
      </span>
      <input
        ref={inputMinuts}
        maxLength={2}
        minLength={1}
        value={minutos}
        onChange={onChangeInputMinuto}
        onFocus={onFocus}
        onBlur={onBlur}
        type="number"
      />
    </div>
  );
}
