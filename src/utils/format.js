const format = {
  currency(value) {
    const nf = Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });

    return nf.format(value);
  },
  date(value, options) {
    const dtf = Intl.DateTimeFormat('pt-br', options);

    return dtf.format(value);
  },
};

export default format;
