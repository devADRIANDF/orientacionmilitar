# 🎯 Embudo de Conversión Optimizado

## 📊 Flujo actual (ANTES - Con fricción)

```
Usuario → Home → Clic "Reservar" → Página Asesorías →
Formulario largo → Espera contacto → Coordina fecha → Paga
```

**Pasos:** 6-7 clicks
**Tiempo:** 2-3 días
**Tasa de conversión:** ~2-5% (BAJA)

---

## ⚡ Nuevo Flujo (OPTIMIZADO - Sin fricción)

```
Usuario → Home → Clic "Reservar" → Elige fecha/hora → Paga con Stripe → ✅ Confirmado
```

**Pasos:** 3 clicks
**Tiempo:** 2-3 minutos
**Tasa de conversión esperada:** ~15-25% (ALTA)

---

## 🔄 Mapa del Funnel Actual

### Fase 1: Awareness (Conocimiento)
**Páginas:**
- `/` (Home) - Landing page principal
- `/blog` - Contenido SEO para atraer tráfico
- `/blog/[slug]` - Artículos individuales

**Objetivos:**
- Generar tráfico orgánico (SEO)
- Educar al visitante
- Generar confianza

**CTAs:**
- Múltiples botones "Reservar Asesoría (75€)"
- Todos apuntan a → `/reservar`

---

### Fase 2: Consideration (Consideración)
**Páginas:**
- `/asesorias` - Info sobre el servicio (página informativa)
- `/sobre-nosotros` - Credibilidad del equipo

**Objetivos:**
- Demostrar valor
- Resolver objeciones
- Mostrar garantía 7 días

**CTAs:**
- "Reservar Asesoría" → `/reservar`
- "Más información" → `/asesorias`

---

### Fase 3: Decision (Decisión) ⭐ CLAVE
**Página:**
- `/reservar` - Checkout simplificado

**Contenido:**
- Precio destacado: 75€
- Qué incluye (bullet points)
- Garantía visible
- Botón de pago GRANDE

**Flujo técnico:**

#### OPCIÓN A: Calendly (Recomendada)
```
1. Cliente ve calendario integrado
2. Elige fecha/hora disponible
3. Calendly muestra checkout Stripe
4. Paga 75€
5. Confirmación automática
```

#### OPCIÓN B: Payment Link
```
1. Cliente hace clic "Pagar 75€"
2. Redirige a Stripe checkout
3. Completa pago
4. Redirige a /confirmacion
5. Email automático
```

#### OPCIÓN C: API Custom
```
1. Cliente hace clic "Pagar 75€"
2. API crea Checkout Session
3. Redirige a Stripe checkout
4. Webhook confirma pago
5. Email + guardar en DB
```

---

### Fase 4: Action (Conversión) 💰
**Página:**
- `/confirmacion` - Pago confirmado

**Contenido:**
- ✅ Mensaje de éxito
- Próximos pasos claros
- Contacto directo (WhatsApp)

**Automatizaciones:**
- Email de confirmación
- Notificación interna (a ti)
- Opcional: Añadir a CRM

---

## 📈 Optimizaciones Aplicadas

### 1. **Eliminación de fricción**
✅ De formulario largo → Un solo clic
✅ De "esperar contacto" → Confirmación instantánea
✅ De 6-7 pasos → 3 pasos

### 2. **Urgencia y escasez** (opcional - añadir)
❌ Todavía no implementado

**Ideas:**
- "Solo 5 plazas disponibles esta semana"
- Calendario con slots limitados
- Timer de oferta temporal

### 3. **Reducción de riesgo**
✅ Garantía de 7 días visible
✅ Logo Stripe (confianza)
✅ Precio transparente

### 4. **Múltiples CTAs**
✅ Navbar: "Reservar Asesoría"
✅ Home: 3 botones "Reservar"
✅ Blog posts: CTA final
✅ Sobre Nosotros: CTA
✅ Todas apuntan a `/reservar`

---

## 🎨 Jerarquía Visual de CTAs

### CTA Principal (Verde/Amarillo - Alta visibilidad)
**Texto:** "Reservar Asesoría - 75€"
**Ubicación:**
- Navbar (siempre visible)
- Home - Hero (above the fold)
- Home - Final de página
- `/reservar` - Botón de pago gigante

### CTA Secundario (Gris - Menor prioridad)
**Texto:** "Más información" / "Conocer al equipo"
**Ubicación:**
- Home - Junto a CTA principal
- Como alternativa cuando no están listos

### CTA Informativo (Link de texto)
**Texto:** "Ver preguntas frecuentes"
**Ubicación:**
- Final de secciones
- Footer

---

## 📱 Mobile First

**Todo el embudo está optimizado para móvil:**

✅ Botones grandes (mínimo 48px altura)
✅ Formularios simplificados
✅ Stripe checkout mobile-responsive
✅ Calendly mobile-friendly
✅ WhatsApp link directo (se abre app)

---

## 🔍 Tracking y Analytics (Recomendado añadir)

### Google Analytics 4 Events

```javascript
// Evento: Usuario ve página /reservar
gtag('event', 'view_checkout', {
  currency: 'EUR',
  value: 75,
  items: [{
    item_name: 'Asesoría Militar'
  }]
})

// Evento: Usuario hace clic en "Pagar"
gtag('event', 'begin_checkout', {
  currency: 'EUR',
  value: 75
})

// Evento: Pago completado
gtag('event', 'purchase', {
  transaction_id: 'stripe_session_id',
  value: 75,
  currency: 'EUR',
  items: [{
    item_name: 'Asesoría Militar',
    price: 75
  }]
})
```

### Meta Pixel (Facebook Ads)

```javascript
// Página /reservar
fbq('track', 'InitiateCheckout', {
  value: 75,
  currency: 'EUR'
})

// Pago completado
fbq('track', 'Purchase', {
  value: 75,
  currency: 'EUR'
})
```

---

## 💡 A/B Tests Futuros (Ideas)

### Test 1: Precio antes vs después
- **A:** "Reservar Asesoría" → luego muestra precio
- **B:** "Reservar por 75€" → precio desde inicio

### Test 2: Calendario vs Payment Link
- **A:** Calendly (elige fecha primero)
- **B:** Payment Link (paga primero)

### Test 3: Garantía
- **A:** Garantía 7 días destacada
- **B:** Sin mención de garantía

### Test 4: Copy del botón
- **A:** "Reservar Asesoría"
- **B:** "Quiero mi Asesoría"
- **C:** "Resolver mis Dudas Ahora"

---

## 📊 KPIs a Medir

### Métricas del Embudo

| Fase | Métrica | Objetivo |
|------|---------|----------|
| **Tráfico** | Visitantes únicos/mes | 500+ mes 1 |
| **Awareness** | Visitas a `/reservar` | 10% del tráfico |
| **Consideration** | Tiempo en `/reservar` | >30 segundos |
| **Decision** | Clics en botón pago | 20% de visitantes |
| **Conversion** | Pagos completados | 5-10% de clics |

### Tasa de Conversión Total

```
Ejemplo con 1000 visitantes/mes:

1000 visitantes → 100 van a /reservar (10%)
100 en /reservar → 20 hacen clic en pagar (20%)
20 en Stripe → 5 completan pago (25%)

CONVERSIÓN FINAL: 0.5% (5/1000)
```

**Con optimizaciones:**
```
1000 visitantes → 150 van a /reservar (15%)
150 en /reservar → 45 hacen clic en pagar (30%)
45 en Stripe → 15 completan pago (33%)

CONVERSIÓN FINAL: 1.5% (15/1000) ← 3X MEJOR
```

---

## ✅ Checklist de Optimización

### Antes de lanzar:

- [x] Botón "Reservar" en navbar
- [x] Múltiples CTAs en home
- [x] Página `/reservar` creada
- [x] Componente `StripeCheckoutButton`
- [x] Página `/confirmacion` post-pago
- [ ] Configurar Stripe (elige opción 1, 2 o 3)
- [ ] Probar flujo completo en modo test
- [ ] Añadir Google Analytics
- [ ] Configurar emails automáticos
- [ ] Probar en móvil real

### Post-lanzamiento:

- [ ] Monitor tasa de conversión
- [ ] A/B testing de copy
- [ ] Optimizar velocidad de carga
- [ ] Retargeting de abandonos
- [ ] Email drip campaign

---

**Conclusión:** Has pasado de un funnel largo y manual a un funnel optimizado de 3 pasos. Ahora la prioridad es configurar Stripe (ver `STRIPE-CONFIG.md`) y empezar a recibir pagos automáticos.
