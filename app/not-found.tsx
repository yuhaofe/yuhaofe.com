import { getLocalizedTexts } from "../lib/i18n";
import cstyles from "./common.module.css";

export default function NotFound() {
  const texts = getLocalizedTexts("error404");

  return (
    <section className={cstyles.section}>
      <h1>{texts.error404}</h1>
    </section>
  );
}
