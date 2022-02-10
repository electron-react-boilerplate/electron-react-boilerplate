class DateHelperInstance {
  readonly hoursInMilissegundos = 3600000;

  readonly minutesEmMilissegundos = 60000;

  subtrairDecimalEmMilliseconds(subtarir: number, milliseconds: number) {
    const millisecondsDecimalSubtract = this.getDeciamlToMillisecond(subtarir);

    return milliseconds - millisecondsDecimalSubtract;
  }

  hourstoMinutesToMilliseconds(hours: number, minutes: number): number {
    let milise = 0;
    milise = this.hoursInMilissegundos * hours;
    milise += this.minutesEmMilissegundos * minutes;
    return milise;
  }

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

  getSecondsByMillisecond(duration: number): number {
    return Math.floor((duration % 60000) / 1000);
  }

  getDeciamlToMillisecond(deciaml: number) {
    return deciaml * this.hoursInMilissegundos;
  }

  getMillisecondToDeciamlNumber(ms: number) {
    return ms / this.hoursInMilissegundos;
  }

  getMinutesByDecimal(deciaml: number): number {
    const miliseconds = this.getDeciamlToMillisecond(deciaml);
    return this.getMinutesByMillisecond(miliseconds);
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
