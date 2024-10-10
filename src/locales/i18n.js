import { createI18n } from "vue-i18n";

import afValue from "./translations/af.json";
import arValue from "./translations/ar.json";
import hyValue from "./translations/hy.json";
import azValue from "./translations/az.json";
import euValue from "./translations/eu.json";
import beValue from "./translations/be.json";
import bnValue from "./translations/bn.json";
import bgValue from "./translations/bg.json";
import myValue from "./translations/my.json";
import caValue from "./translations/ca.json";
import rCNValue from "./translations/zh-rCN.json";
import rTWValue from "./translations/zh-rTW.json";
import hrValue from "./translations/hr.json";
import csValue from "./translations/cs.json";
import daValue from "./translations/da.json";
import nlValue from "./translations/nl.json";
import etValue from "./translations/et.json";
import enValue from "./translations/en.json";
import fiValue from "./translations/fi.json";
import frValue from "./translations/fr.json";
import deValue from "./translations/de.json";
import elValue from "./translations/el.json";
import iwValue from "./translations/iw.json";
import hiValue from "./translations/hi.json";
import huValue from "./translations/hu.json";
import isValue from "./translations/is.json";
import idValue from "./translations/id.json";
import inValue from "./translations/in.json";
import itValue from "./translations/it.json";
import jaValue from "./translations/ja.json";
import knValue from "./translations/kn.json";
import kmValue from "./translations/km.json";
import koValue from "./translations/ko.json";
import loValue from "./translations/lo.json";
import lvValue from "./translations/lv.json";
import ltValue from "./translations/lt.json";
import mkValue from "./translations/mk.json";
import msValue from "./translations/ms.json";
import mlValue from "./translations/ml.json";
import mrValue from "./translations/mr.json";
import mnValue from "./translations/mn.json";
import neValue from "./translations/ne.json";
import nbValue from "./translations/nb.json";
import faValue from "./translations/fa.json";
import plValue from "./translations/pl.json";
import ptValue from "./translations/pt.json";
import roValue from "./translations/ro.json";
import ruValue from "./translations/ru.json";
import srValue from "./translations/sr.json";
import siValue from "./translations/si.json";
import skValue from "./translations/sk.json";
import slValue from "./translations/sl.json";
import esValue from "./translations/es.json";
import swValue from "./translations/sw.json";
import svValue from "./translations/sv.json";
import teValue from "./translations/te.json";
import thValue from "./translations/th.json";
import trValue from "./translations/tr.json";
import ukValue from "./translations/uk.json";
import viValue from "./translations/vi.json";
import zuValue from "./translations/zu.json";

const messages = {
  af: afValue,
  ar: arValue,
  hy: hyValue,
  az: azValue,
  eu: euValue,
  be: beValue,
  bn: bnValue,
  bg: bgValue,
  my: myValue,
  ca: caValue,
  rCN: rCNValue,
  rTW: rTWValue,
  hr: hrValue,
  cs: csValue,
  da: daValue,
  nl: nlValue,
  et: etValue,
  en: enValue,
  fi: fiValue,
  fr: frValue,
  de: deValue,
  el: elValue,
  iw: iwValue,
  hi: hiValue,
  hu: huValue,
  is: isValue,
  id: idValue,
  in: inValue,
  it: itValue,
  ja: jaValue,
  kn: knValue,
  km: kmValue,
  ko: koValue,
  lo: loValue,
  lv: lvValue,
  lt: ltValue,
  mk: mkValue,
  ms: msValue,
  ml: mlValue,
  mr: mrValue,
  mn: mnValue,
  ne: neValue,
  nb: nbValue,
  fa: faValue,
  pl: plValue,
  pt: ptValue,
  ro: roValue,
  ru: ruValue,
  sr: srValue,
  si: siValue,
  sk: skValue,
  sl: slValue,
  es: esValue,
  sw: swValue,
  sv: svValue,
  te: teValue,
  th: thValue,
  tr: trValue,
  uk: ukValue,
  vi: viValue,
  zu: zuValue,
};

const storedLanguage = localStorage.getItem("language");
const defaultLanguage = "en"; // Ngôn ngữ mặc định
const i18n = createI18n({
  locale: storedLanguage || defaultLanguage, // Sử dụng ngôn ngữ từ localStorage nếu có, ngược lại sử dụng ngôn ngữ mặc định
  fallbackLocale: defaultLanguage,
  messages,
});

export default i18n;
