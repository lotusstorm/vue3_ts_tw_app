export const ROUTS_NAMES = {
  MAIN: "Main",
  CONTACTS: "Contacts",
  CREATE_CONTACTS: "CreateContact",
};

export const ROUTS_TRANSITIONS = {
  [ROUTS_NAMES.MAIN]: {
    [ROUTS_NAMES.CONTACTS]: {
      fromSlide: "slide-right",
      toSlide: "slide-right",
    },
  },
  [ROUTS_NAMES.CONTACTS]: {
    [ROUTS_NAMES.MAIN]: {
      fromSlide: "slide-left",
      toSlide: "slide-left",
    },
    [ROUTS_NAMES.CREATE_CONTACTS]: {
      fromSlide: "slide-right",
      toSlide: "slide-right",
    },
  },
  [ROUTS_NAMES.CREATE_CONTACTS]: {
    [ROUTS_NAMES.CONTACTS]: {
      fromSlide: "slide-left",
      toSlide: "slide-left",
    },
  },
  [ROUTS_NAMES.MAIN]: {
    [ROUTS_NAMES.CONTACTS]: {
      fromSlide: "slide-right",
      toSlide: "slide-right",
    },
  },
};

export const getAnimate = (to: string, from: string) => {
  return (to && from && ROUTS_TRANSITIONS?.[to]?.[from]) || { fromSlide: "fade", toSlide: "fade" };
};
