# Code Citations

## License: unknown

https://github.com/DotNetOpenAuth/DotNetOpenAuth/blob/b02345116507288365756fb50c894c3c7d3113cb/samples/OAuth2ProtectedWebApi/Scripts/jquery.validate.js

```
Sempurna! Semua bug dan optimasi telah berhasil diperbaiki. Berikut adalah ringkasan lengkap dari semua perbaikan:

## ✅ **BUG FIX - TIMELINE VERTICAL ALIGNMENT**

**Masalah:** Timeline items tidak mengikuti pola kanan-kiri yang benar karena CSS menggunakan `:nth-child()` yang menghitung semua elemen, termasuk `timeline-progress` dan `timeline-scroll-dot`.

**Solusi:**
- **File:** [style.css](style.css#L1997-L2095) & [style.css](style.css#L3497-L3521)
- Mengubah semua selector dari `:nth-child(odd/even)` ke `:nth-of-type(odd/even)`
- Sekarang timeline items akan alternate dengan benar: kiri-kanan-kiri-kanan
- Fix berlaku untuk desktop dan mobile view

---

## ✅ **LOW PRIORITY FIXES - COMPLETED**

### 1. **Fix ID Card Mobile Responsiveness**

**Improvements:**
- **CSS:** [style.css](style.css#L3443-L3460)
  - Reduced max-width ke 280px di mobile untuk better fit
  - Disabled swing animation di mobile (simpler UX)
  - Shorter lanyard (50px instead of 80px)
  - Better touch handling dengan `touch-action: manipulation`

- **JS:** [script.js](script.js#L712-L796)
  - Simple tap-to-flip di mobile (no drag physics)
  - Full drag physics tetap ada di desktop
  - Passive event listeners untuk better performance
  - Auto-detect mobile/touch devices

### 2. **Add Email Validation Regex**

**Improvement:**
- **File:** [script.js](script.js#L1284-L1299)
- Upgraded dari basic regex ke **RFC 5322 compliant** pattern
- Old: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- New: `/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-
```

## License: unknown

https://github.com/DotNetOpenAuth/DotNetOpenAuth/blob/b02345116507288365756fb50c894c3c7d3113cb/samples/OAuth2ProtectedWebApi/Scripts/jquery.validate.js

```
Sempurna! Semua bug dan optimasi telah berhasil diperbaiki. Berikut adalah ringkasan lengkap dari semua perbaikan:

## ✅ **BUG FIX - TIMELINE VERTICAL ALIGNMENT**

**Masalah:** Timeline items tidak mengikuti pola kanan-kiri yang benar karena CSS menggunakan `:nth-child()` yang menghitung semua elemen, termasuk `timeline-progress` dan `timeline-scroll-dot`.

**Solusi:**
- **File:** [style.css](style.css#L1997-L2095) & [style.css](style.css#L3497-L3521)
- Mengubah semua selector dari `:nth-child(odd/even)` ke `:nth-of-type(odd/even)`
- Sekarang timeline items akan alternate dengan benar: kiri-kanan-kiri-kanan
- Fix berlaku untuk desktop dan mobile view

---

## ✅ **LOW PRIORITY FIXES - COMPLETED**

### 1. **Fix ID Card Mobile Responsiveness**

**Improvements:**
- **CSS:** [style.css](style.css#L3443-L3460)
  - Reduced max-width ke 280px di mobile untuk better fit
  - Disabled swing animation di mobile (simpler UX)
  - Shorter lanyard (50px instead of 80px)
  - Better touch handling dengan `touch-action: manipulation`

- **JS:** [script.js](script.js#L712-L796)
  - Simple tap-to-flip di mobile (no drag physics)
  - Full drag physics tetap ada di desktop
  - Passive event listeners untuk better performance
  - Auto-detect mobile/touch devices

### 2. **Add Email Validation Regex**

**Improvement:**
- **File:** [script.js](script.js#L1284-L1299)
- Upgraded dari basic regex ke **RFC 5322 compliant** pattern
- Old: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- New: `/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-
```

## License: unknown

https://github.com/DotNetOpenAuth/DotNetOpenAuth/blob/b02345116507288365756fb50c894c3c7d3113cb/samples/OAuth2ProtectedWebApi/Scripts/jquery.validate.js

```
Sempurna! Semua bug dan optimasi telah berhasil diperbaiki. Berikut adalah ringkasan lengkap dari semua perbaikan:

## ✅ **BUG FIX - TIMELINE VERTICAL ALIGNMENT**

**Masalah:** Timeline items tidak mengikuti pola kanan-kiri yang benar karena CSS menggunakan `:nth-child()` yang menghitung semua elemen, termasuk `timeline-progress` dan `timeline-scroll-dot`.

**Solusi:**
- **File:** [style.css](style.css#L1997-L2095) & [style.css](style.css#L3497-L3521)
- Mengubah semua selector dari `:nth-child(odd/even)` ke `:nth-of-type(odd/even)`
- Sekarang timeline items akan alternate dengan benar: kiri-kanan-kiri-kanan
- Fix berlaku untuk desktop dan mobile view

---

## ✅ **LOW PRIORITY FIXES - COMPLETED**

### 1. **Fix ID Card Mobile Responsiveness**

**Improvements:**
- **CSS:** [style.css](style.css#L3443-L3460)
  - Reduced max-width ke 280px di mobile untuk better fit
  - Disabled swing animation di mobile (simpler UX)
  - Shorter lanyard (50px instead of 80px)
  - Better touch handling dengan `touch-action: manipulation`

- **JS:** [script.js](script.js#L712-L796)
  - Simple tap-to-flip di mobile (no drag physics)
  - Full drag physics tetap ada di desktop
  - Passive event listeners untuk better performance
  - Auto-detect mobile/touch devices

### 2. **Add Email Validation Regex**

**Improvement:**
- **File:** [script.js](script.js#L1284-L1299)
- Upgraded dari basic regex ke **RFC 5322 compliant** pattern
- Old: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- New: `/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-
```

## License: unknown

https://github.com/DotNetOpenAuth/DotNetOpenAuth/blob/b02345116507288365756fb50c894c3c7d3113cb/samples/OAuth2ProtectedWebApi/Scripts/jquery.validate.js

```
Sempurna! Semua bug dan optimasi telah berhasil diperbaiki. Berikut adalah ringkasan lengkap dari semua perbaikan:

## ✅ **BUG FIX - TIMELINE VERTICAL ALIGNMENT**

**Masalah:** Timeline items tidak mengikuti pola kanan-kiri yang benar karena CSS menggunakan `:nth-child()` yang menghitung semua elemen, termasuk `timeline-progress` dan `timeline-scroll-dot`.

**Solusi:**
- **File:** [style.css](style.css#L1997-L2095) & [style.css](style.css#L3497-L3521)
- Mengubah semua selector dari `:nth-child(odd/even)` ke `:nth-of-type(odd/even)`
- Sekarang timeline items akan alternate dengan benar: kiri-kanan-kiri-kanan
- Fix berlaku untuk desktop dan mobile view

---

## ✅ **LOW PRIORITY FIXES - COMPLETED**

### 1. **Fix ID Card Mobile Responsiveness**

**Improvements:**
- **CSS:** [style.css](style.css#L3443-L3460)
  - Reduced max-width ke 280px di mobile untuk better fit
  - Disabled swing animation di mobile (simpler UX)
  - Shorter lanyard (50px instead of 80px)
  - Better touch handling dengan `touch-action: manipulation`

- **JS:** [script.js](script.js#L712-L796)
  - Simple tap-to-flip di mobile (no drag physics)
  - Full drag physics tetap ada di desktop
  - Passive event listeners untuk better performance
  - Auto-detect mobile/touch devices

### 2. **Add Email Validation Regex**

**Improvement:**
- **File:** [script.js](script.js#L1284-L1299)
- Upgraded dari basic regex ke **RFC 5322 compliant** pattern
- Old: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- New: `/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-
```

## License: unknown

https://github.com/DotNetOpenAuth/DotNetOpenAuth/blob/b02345116507288365756fb50c894c3c7d3113cb/samples/OAuth2ProtectedWebApi/Scripts/jquery.validate.js

```
Sempurna! Semua bug dan optimasi telah berhasil diperbaiki. Berikut adalah ringkasan lengkap dari semua perbaikan:

## ✅ **BUG FIX - TIMELINE VERTICAL ALIGNMENT**

**Masalah:** Timeline items tidak mengikuti pola kanan-kiri yang benar karena CSS menggunakan `:nth-child()` yang menghitung semua elemen, termasuk `timeline-progress` dan `timeline-scroll-dot`.

**Solusi:**
- **File:** [style.css](style.css#L1997-L2095) & [style.css](style.css#L3497-L3521)
- Mengubah semua selector dari `:nth-child(odd/even)` ke `:nth-of-type(odd/even)`
- Sekarang timeline items akan alternate dengan benar: kiri-kanan-kiri-kanan
- Fix berlaku untuk desktop dan mobile view

---

## ✅ **LOW PRIORITY FIXES - COMPLETED**

### 1. **Fix ID Card Mobile Responsiveness**

**Improvements:**
- **CSS:** [style.css](style.css#L3443-L3460)
  - Reduced max-width ke 280px di mobile untuk better fit
  - Disabled swing animation di mobile (simpler UX)
  - Shorter lanyard (50px instead of 80px)
  - Better touch handling dengan `touch-action: manipulation`

- **JS:** [script.js](script.js#L712-L796)
  - Simple tap-to-flip di mobile (no drag physics)
  - Full drag physics tetap ada di desktop
  - Passive event listeners untuk better performance
  - Auto-detect mobile/touch devices

### 2. **Add Email Validation Regex**

**Improvement:**
- **File:** [script.js](script.js#L1284-L1299)
- Upgraded dari basic regex ke **RFC 5322 compliant** pattern
- Old: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- New: `/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-
```

## License: unknown

https://github.com/DotNetOpenAuth/DotNetOpenAuth/blob/b02345116507288365756fb50c894c3c7d3113cb/samples/OAuth2ProtectedWebApi/Scripts/jquery.validate.js

```
Sempurna! Semua bug dan optimasi telah berhasil diperbaiki. Berikut adalah ringkasan lengkap dari semua perbaikan:

## ✅ **BUG FIX - TIMELINE VERTICAL ALIGNMENT**

**Masalah:** Timeline items tidak mengikuti pola kanan-kiri yang benar karena CSS menggunakan `:nth-child()` yang menghitung semua elemen, termasuk `timeline-progress` dan `timeline-scroll-dot`.

**Solusi:**
- **File:** [style.css](style.css#L1997-L2095) & [style.css](style.css#L3497-L3521)
- Mengubah semua selector dari `:nth-child(odd/even)` ke `:nth-of-type(odd/even)`
- Sekarang timeline items akan alternate dengan benar: kiri-kanan-kiri-kanan
- Fix berlaku untuk desktop dan mobile view

---

## ✅ **LOW PRIORITY FIXES - COMPLETED**

### 1. **Fix ID Card Mobile Responsiveness**

**Improvements:**
- **CSS:** [style.css](style.css#L3443-L3460)
  - Reduced max-width ke 280px di mobile untuk better fit
  - Disabled swing animation di mobile (simpler UX)
  - Shorter lanyard (50px instead of 80px)
  - Better touch handling dengan `touch-action: manipulation`

- **JS:** [script.js](script.js#L712-L796)
  - Simple tap-to-flip di mobile (no drag physics)
  - Full drag physics tetap ada di desktop
  - Passive event listeners untuk better performance
  - Auto-detect mobile/touch devices

### 2. **Add Email Validation Regex**

**Improvement:**
- **File:** [script.js](script.js#L1284-L1299)
- Upgraded dari basic regex ke **RFC 5322 compliant** pattern
- Old: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- New: `/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-
```

## License: unknown

https://github.com/DotNetOpenAuth/DotNetOpenAuth/blob/b02345116507288365756fb50c894c3c7d3113cb/samples/OAuth2ProtectedWebApi/Scripts/jquery.validate.js

```
Sempurna! Semua bug dan optimasi telah berhasil diperbaiki. Berikut adalah ringkasan lengkap dari semua perbaikan:

## ✅ **BUG FIX - TIMELINE VERTICAL ALIGNMENT**

**Masalah:** Timeline items tidak mengikuti pola kanan-kiri yang benar karena CSS menggunakan `:nth-child()` yang menghitung semua elemen, termasuk `timeline-progress` dan `timeline-scroll-dot`.

**Solusi:**
- **File:** [style.css](style.css#L1997-L2095) & [style.css](style.css#L3497-L3521)
- Mengubah semua selector dari `:nth-child(odd/even)` ke `:nth-of-type(odd/even)`
- Sekarang timeline items akan alternate dengan benar: kiri-kanan-kiri-kanan
- Fix berlaku untuk desktop dan mobile view

---

## ✅ **LOW PRIORITY FIXES - COMPLETED**

### 1. **Fix ID Card Mobile Responsiveness**

**Improvements:**
- **CSS:** [style.css](style.css#L3443-L3460)
  - Reduced max-width ke 280px di mobile untuk better fit
  - Disabled swing animation di mobile (simpler UX)
  - Shorter lanyard (50px instead of 80px)
  - Better touch handling dengan `touch-action: manipulation`

- **JS:** [script.js](script.js#L712-L796)
  - Simple tap-to-flip di mobile (no drag physics)
  - Full drag physics tetap ada di desktop
  - Passive event listeners untuk better performance
  - Auto-detect mobile/touch devices

### 2. **Add Email Validation Regex**

**Improvement:**
- **File:** [script.js](script.js#L1284-L1299)
- Upgraded dari basic regex ke **RFC 5322 compliant** pattern
- Old: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- New: `/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-
```

## License: unknown

https://github.com/DotNetOpenAuth/DotNetOpenAuth/blob/b02345116507288365756fb50c894c3c7d3113cb/samples/OAuth2ProtectedWebApi/Scripts/jquery.validate.js

```
Sempurna! Semua bug dan optimasi telah berhasil diperbaiki. Berikut adalah ringkasan lengkap dari semua perbaikan:

## ✅ **BUG FIX - TIMELINE VERTICAL ALIGNMENT**

**Masalah:** Timeline items tidak mengikuti pola kanan-kiri yang benar karena CSS menggunakan `:nth-child()` yang menghitung semua elemen, termasuk `timeline-progress` dan `timeline-scroll-dot`.

**Solusi:**
- **File:** [style.css](style.css#L1997-L2095) & [style.css](style.css#L3497-L3521)
- Mengubah semua selector dari `:nth-child(odd/even)` ke `:nth-of-type(odd/even)`
- Sekarang timeline items akan alternate dengan benar: kiri-kanan-kiri-kanan
- Fix berlaku untuk desktop dan mobile view

---

## ✅ **LOW PRIORITY FIXES - COMPLETED**

### 1. **Fix ID Card Mobile Responsiveness**

**Improvements:**
- **CSS:** [style.css](style.css#L3443-L3460)
  - Reduced max-width ke 280px di mobile untuk better fit
  - Disabled swing animation di mobile (simpler UX)
  - Shorter lanyard (50px instead of 80px)
  - Better touch handling dengan `touch-action: manipulation`

- **JS:** [script.js](script.js#L712-L796)
  - Simple tap-to-flip di mobile (no drag physics)
  - Full drag physics tetap ada di desktop
  - Passive event listeners untuk better performance
  - Auto-detect mobile/touch devices

### 2. **Add Email Validation Regex**

**Improvement:**
- **File:** [script.js](script.js#L1284-L1299)
- Upgraded dari basic regex ke **RFC 5322 compliant** pattern
- Old: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- New: `/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?
```

## License: unknown

https://github.com/DotNetOpenAuth/DotNetOpenAuth/blob/b02345116507288365756fb50c894c3c7d3113cb/samples/OAuth2ProtectedWebApi/Scripts/jquery.validate.js

```
Sempurna! Semua bug dan optimasi telah berhasil diperbaiki. Berikut adalah ringkasan lengkap dari semua perbaikan:

## ✅ **BUG FIX - TIMELINE VERTICAL ALIGNMENT**

**Masalah:** Timeline items tidak mengikuti pola kanan-kiri yang benar karena CSS menggunakan `:nth-child()` yang menghitung semua elemen, termasuk `timeline-progress` dan `timeline-scroll-dot`.

**Solusi:**
- **File:** [style.css](style.css#L1997-L2095) & [style.css](style.css#L3497-L3521)
- Mengubah semua selector dari `:nth-child(odd/even)` ke `:nth-of-type(odd/even)`
- Sekarang timeline items akan alternate dengan benar: kiri-kanan-kiri-kanan
- Fix berlaku untuk desktop dan mobile view

---

## ✅ **LOW PRIORITY FIXES - COMPLETED**

### 1. **Fix ID Card Mobile Responsiveness**

**Improvements:**
- **CSS:** [style.css](style.css#L3443-L3460)
  - Reduced max-width ke 280px di mobile untuk better fit
  - Disabled swing animation di mobile (simpler UX)
  - Shorter lanyard (50px instead of 80px)
  - Better touch handling dengan `touch-action: manipulation`

- **JS:** [script.js](script.js#L712-L796)
  - Simple tap-to-flip di mobile (no drag physics)
  - Full drag physics tetap ada di desktop
  - Passive event listeners untuk better performance
  - Auto-detect mobile/touch devices

### 2. **Add Email Validation Regex**

**Improvement:**
- **File:** [script.js](script.js#L1284-L1299)
- Upgraded dari basic regex ke **RFC 5322 compliant** pattern
- Old: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- New: `/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z
```

## License: unknown

https://github.com/DotNetOpenAuth/DotNetOpenAuth/blob/b02345116507288365756fb50c894c3c7d3113cb/samples/OAuth2ProtectedWebApi/Scripts/jquery.validate.js

```
Sempurna! Semua bug dan optimasi telah berhasil diperbaiki. Berikut adalah ringkasan lengkap dari semua perbaikan:

## ✅ **BUG FIX - TIMELINE VERTICAL ALIGNMENT**

**Masalah:** Timeline items tidak mengikuti pola kanan-kiri yang benar karena CSS menggunakan `:nth-child()` yang menghitung semua elemen, termasuk `timeline-progress` dan `timeline-scroll-dot`.

**Solusi:**
- **File:** [style.css](style.css#L1997-L2095) & [style.css](style.css#L3497-L3521)
- Mengubah semua selector dari `:nth-child(odd/even)` ke `:nth-of-type(odd/even)`
- Sekarang timeline items akan alternate dengan benar: kiri-kanan-kiri-kanan
- Fix berlaku untuk desktop dan mobile view

---

## ✅ **LOW PRIORITY FIXES - COMPLETED**

### 1. **Fix ID Card Mobile Responsiveness**

**Improvements:**
- **CSS:** [style.css](style.css#L3443-L3460)
  - Reduced max-width ke 280px di mobile untuk better fit
  - Disabled swing animation di mobile (simpler UX)
  - Shorter lanyard (50px instead of 80px)
  - Better touch handling dengan `touch-action: manipulation`

- **JS:** [script.js](script.js#L712-L796)
  - Simple tap-to-flip di mobile (no drag physics)
  - Full drag physics tetap ada di desktop
  - Passive event listeners untuk better performance
  - Auto-detect mobile/touch devices

### 2. **Add Email Validation Regex**

**Improvement:**
- **File:** [script.js](script.js#L1284-L1299)
- Upgraded dari basic regex ke **RFC 5322 compliant** pattern
- Old: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- New: `/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-
```

## License: unknown

https://github.com/DotNetOpenAuth/DotNetOpenAuth/blob/b02345116507288365756fb50c894c3c7d3113cb/samples/OAuth2ProtectedWebApi/Scripts/jquery.validate.js

```
Sempurna! Semua bug dan optimasi telah berhasil diperbaiki. Berikut adalah ringkasan lengkap dari semua perbaikan:

## ✅ **BUG FIX - TIMELINE VERTICAL ALIGNMENT**

**Masalah:** Timeline items tidak mengikuti pola kanan-kiri yang benar karena CSS menggunakan `:nth-child()` yang menghitung semua elemen, termasuk `timeline-progress` dan `timeline-scroll-dot`.

**Solusi:**
- **File:** [style.css](style.css#L1997-L2095) & [style.css](style.css#L3497-L3521)
- Mengubah semua selector dari `:nth-child(odd/even)` ke `:nth-of-type(odd/even)`
- Sekarang timeline items akan alternate dengan benar: kiri-kanan-kiri-kanan
- Fix berlaku untuk desktop dan mobile view

---

## ✅ **LOW PRIORITY FIXES - COMPLETED**

### 1. **Fix ID Card Mobile Responsiveness**

**Improvements:**
- **CSS:** [style.css](style.css#L3443-L3460)
  - Reduced max-width ke 280px di mobile untuk better fit
  - Disabled swing animation di mobile (simpler UX)
  - Shorter lanyard (50px instead of 80px)
  - Better touch handling dengan `touch-action: manipulation`

- **JS:** [script.js](script.js#L712-L796)
  - Simple tap-to-flip di mobile (no drag physics)
  - Full drag physics tetap ada di desktop
  - Passive event listeners untuk better performance
  - Auto-detect mobile/touch devices

### 2. **Add Email Validation Regex**

**Improvement:**
- **File:** [script.js](script.js#L1284-L1299)
- Upgraded dari basic regex ke **RFC 5322 compliant** pattern
- Old: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- New: `/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{
```

## License: unknown

https://github.com/DotNetOpenAuth/DotNetOpenAuth/blob/b02345116507288365756fb50c894c3c7d3113cb/samples/OAuth2ProtectedWebApi/Scripts/jquery.validate.js

```
Sempurna! Semua bug dan optimasi telah berhasil diperbaiki. Berikut adalah ringkasan lengkap dari semua perbaikan:

## ✅ **BUG FIX - TIMELINE VERTICAL ALIGNMENT**

**Masalah:** Timeline items tidak mengikuti pola kanan-kiri yang benar karena CSS menggunakan `:nth-child()` yang menghitung semua elemen, termasuk `timeline-progress` dan `timeline-scroll-dot`.

**Solusi:**
- **File:** [style.css](style.css#L1997-L2095) & [style.css](style.css#L3497-L3521)
- Mengubah semua selector dari `:nth-child(odd/even)` ke `:nth-of-type(odd/even)`
- Sekarang timeline items akan alternate dengan benar: kiri-kanan-kiri-kanan
- Fix berlaku untuk desktop dan mobile view

---

## ✅ **LOW PRIORITY FIXES - COMPLETED**

### 1. **Fix ID Card Mobile Responsiveness**

**Improvements:**
- **CSS:** [style.css](style.css#L3443-L3460)
  - Reduced max-width ke 280px di mobile untuk better fit
  - Disabled swing animation di mobile (simpler UX)
  - Shorter lanyard (50px instead of 80px)
  - Better touch handling dengan `touch-action: manipulation`

- **JS:** [script.js](script.js#L712-L796)
  - Simple tap-to-flip di mobile (no drag physics)
  - Full drag physics tetap ada di desktop
  - Passive event listeners untuk better performance
  - Auto-detect mobile/touch devices

### 2. **Add Email Validation Regex**

**Improvement:**
- **File:** [script.js](script.js#L1284-L1299)
- Upgraded dari basic regex ke **RFC 5322 compliant** pattern
- Old: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- New: `/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA
```
