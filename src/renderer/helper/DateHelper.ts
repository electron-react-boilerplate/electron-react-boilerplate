class DateHelperInstance {
  formatNumberHours(numberFormat: number): string {
    return numberFormat < 10 ? `0${numberFormat}` : numberFormat.toString();
  }

  formatNumberMinuts(numberFormat: number): string {
    return numberFormat < 10 ? `0${numberFormat}` : numberFormat.toString();
  }

  getHourByMillisecond(duration: number): number {
    return Math.floor(duration / (1000 * 60 * 60));
  }

  getMinutesByMillisecond(duration: number): number {
    return Math.floor((duration / (1000 * 60)) % 60);
  }

  getTimeValueByMillisecond(duration: number) {
    return {
      minutes: this.getMinutesByMillisecond(duration),
      hours: this.getHourByMillisecond(duration),
    };
  }

  getMillisecondToDecimalHours(duration: number) {
    return (duration / (1000 * 60 * 60)).toFixed(2);
  }

  msToTime(duration: number, heNegativo = false) {
    const { minutes, hours } = this.getTimeValueByMillisecond(duration);
    const strHours = this.formatNumberHours(hours);
    const strMinutes = this.formatNumberMinuts(minutes);

    return `${heNegativo ? '-' : ''}${strHours}:${strMinutes}`;
  }
}

export const DateHelper = new DateHelperInstance();
