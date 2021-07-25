# Event Project

## Spring

### Bitirlen Aşamalar

- [x] **GET** ile `localhost:8080/events` adresi tanımlandı.
- [x] **POST** ile `localhost:8080/events` adresi tanımlandı.
- [x] **PUT** ile `localhost:8080/events/{id}` adresi tanıımlandı.
- [x] **DELETE** ile `localhost:8080/events/{id}` adresi tanımlandı.
- [x] Question ve Answer modelleri oluşturuldu.
- [x] Daha iyi bir görünüm için **Message Response** oluşturuldu.
- [x] Kullanıcının bir event'e kayıdı için API bağlantısı sağlandı.
- [x] User Registiration API tanımlandı.
- [x] Kategori olarak POST ile belirtebiliyoruz, eğer girilmezse default olarak OTHERS kategorisine aktarılır.

### Devam Eden Aşamalar

- [ ] Question ve Answer için API bağlantıları oluşturualacak.
- [ ] Hata aldınğında da tekrardan MessageResponse ile cevap verilecek.

### Info

- Bir kullanıcının bir etkinliğe daha önceden kayıtlı mı olduğunu **QRCode** üzerinden kontrol edeceğiz.
- **Event** sınıfı hangi **user**'in hangi etkinliğe kayıt olunmuş olduğunu 
  göremeyecek direkt olarak. Bunun yerine ***QRCodes*** sorgusu yapması gerekecek.

## React

- [x] Header ve Footer componentleri eklendi.
- [x] Basit bir Event Card componenti eklendi.
- [x] Event Details Modal'ı eklendi.
- [x] Event Add Modal'ı eklendi.
- [x] Event Delete Modal'ı eklendi.