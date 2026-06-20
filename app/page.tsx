import type { Metadata } from "next"
import Link from "next/link"
import global from "./globals.css"
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Zaragoza II",
  description: "Panel de administración",
}
export default function Home() {
  return (
    <>
      <section className="zh" id="inicio">
        <div className="zh-bg" aria-hidden="true">II</div>
        <div className="zh-inner">
          <div className="zbar-wrap" aria-hidden="true">
            <div className="zbar"></div>
            <div className="zbar"></div>
          </div>
          <p className="zh-eye">Kiosco · Neuquén · Desde 2005</p>
          <h1 className="zh-title">
            Zaragoza<span className="rom">II</span>
          </h1>
          <p className="zh-sub">
            Tu kiosco de barrio. El de siempre, el de todos los días.
            Golosinas, bebidas, revistas y todo lo que necesitás, a la vuelta
            de tu casa.
          </p>
          <div className="zh-btns">
            <Link href="/productos" className="zb-p">Ver productos</Link>
            <Link href="#locales" className="zb-o">Nuestros locales</Link>
          </div>
        </div>
        <div className="zh-stats">
          <div>
            <div className="zst-n">+20</div>
            <div className="zst-l">Años en el barrio</div>
          </div>
          <div>
            <div className="zst-n">3</div>
            <div className="zst-l">Locales</div>
          </div>
          <div>
            <div className="zst-n">+500</div>
            <div className="zst-l">Productos</div>
          </div>
        </div>
      </section>

      <section className="zsec znos-bg" id="nosotros">
        <div className="zey">
          <div className="zey-bg"><div className="zey-b"></div><div className="zey-b"></div></div>
          <span className="zey-t">Quiénes somos</span>
        </div>
        <h2 className="zh2">Nuestra historia</h2>
        <div className="znos-grid">
          <div className="znos-txt">
            <p>
              Todo empezó en <strong>2005</strong> con un pequeño kiosco en
              el centro de Neuquén. Lo que comenzó como un emprendimiento
              familiar creció de a poco, impulsado por la confianza de los
              vecinos.
            </p>
            <p>
              Hoy somos <strong>tres locales</strong> en distintos barrios
              de la ciudad, pero seguimos siendo lo mismo de siempre: el
              kiosco de tu esquina, el que te conoce de nombre.
            </p>
          </div>
          <div className="zown-card">
            <div className="zown-av">MC</div>
            <div className="zown-name">Matias Contreras</div>
            <div className="zown-role">Fundador</div>
            <div className="zown-bio">
              Abrió el primer local con una heladera y muchas ganas. Más de
              25 años después todavía se lo puede ver detrás del mostrador. Es la puta cabra
            </div>
          </div>
          <div className="zown-card">
            <div className="zown-av">DR</div>
            <div className="zown-name">El Joven Doctor</div>
            <div className="zown-role">Co-fundador</div>
            <div className="zown-bio">
              Es el joven Doctor (ah)
              Ladies and gentlemen (squad), bitch
              One, two, three, let's go
              Yo vengo de La Matanza
              Un par de chetos me miran con desconfianza
              Tengo el infierno cerca
              Podés cruzarme comprando paco en Puerta
              Y otro día en el Nordelta
              Podés verme en Recoleta
              Otro día comprando paco en la Zabaleta
            </div>
          </div>
        </div>
      </section>

      <section className="zsec zloc-bg" id="locales">
        <div className="zey">
          <div className="zey-bg"><div className="zey-b"></div><div className="zey-b"></div></div>
          <span className="zey-t">Dónde encontrarnos</span>
        </div>
        <h2 className="zh2">Nuestros locales</h2>
        <div className="zloc-list">
          <div className="zloc-item">
            <div className="zloc-num">Local 01</div>
            <div className="zloc-name">Zaragoza II — Centro</div>
            <div className="zloc-addr">Av. Argentina 145, Neuquén Capital</div>
            <div className="zloc-hrs">Lun–Sáb 7:00–22:00 · Dom 8:00–20:00</div>
          </div>
          <div className="zloc-item">
            <div className="zloc-num">Local 02</div>
            <div className="zloc-name">Zaragoza II — Confluencia</div>
            <div className="zloc-addr">Av. San Martín 892, Confluencia</div>
            <div className="zloc-hrs">Lun–Sáb 6:30–23:00 · Dom 8:00–21:00</div>
          </div>
          <div className="zloc-item">
            <div className="zloc-num">Local 03</div>
            <div className="zloc-name">Zaragoza II — Alta Barda</div>
            <div className="zloc-addr">Calle Río Negro 234, Alta Barda</div>
            <div className="zloc-hrs">Lun–Sáb 8:00–21:00 · Dom 9:00–19:00</div>
          </div>
        </div>
      </section>

      <section className="zsec zcon-bg" id="contacto">
        <div className="zey">
          <div className="zey-bg"><div className="zey-b"></div><div className="zey-b"></div></div>
          <span className="zey-t">Escribinos</span>
        </div>
        <h2 className="zh2">Contacto</h2>
        <div className="zcon-grid">
          <a className="zcon-item" href="#">
            <div className="zcon-lbl">WhatsApp</div>
            <div className="zcon-val">299 400-0000</div>
          </a>
          <a className="zcon-item" href="#">
            <div className="zcon-lbl">Teléfono</div>
            <div className="zcon-val">299 400-0000</div>
          </a>
          <a className="zcon-item" href="#">
            <div className="zcon-lbl">Instagram</div>
            <div className="zcon-val">@zaragozaii</div>
          </a>
        </div>
      </section>

      <footer className="zfooter">
        <div className="zf-logo">Zaragoza II</div>
        <div className="zf-copy">© 2026 Zaragoza II — Neuquén, Argentina</div>
      </footer>
    </>
  )
}
