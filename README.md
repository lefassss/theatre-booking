# 🎭 Theatre Booking App

Εφαρμογή κράτησης θέσεων σε θεατρικές παραστάσεις μέσω κινητής συσκευής.

## Τεχνολογίες
- **Frontend**: React Native (Expo)
- **Backend**: Node.js & Express
- **Database**: MariaDB

## Οδηγίες Εγκατάστασης

### Προαπαιτούμενα
- Node.js
- XAMPP (MariaDB)

### Βάση Δεδομένων
1. Άνοιξε XAMPP και ξεκίνα Apache & MySQL
2. Πήγαινε στο http://localhost/phpmyadmin
3. Δημιούργησε βάση δεδομένων με όνομα `theatre_booking`
4. Εκτέλεσε τα SQL scripts από το φάκελο `backend`

### Backend
```bash
cd backend
npm install
node server.js
```

### Frontend
```bash
cd frontend
npm install
npx expo start --web
```

## Λειτουργίες
- Εγγραφή & Σύνδεση χρήστη με JWT
- Προβολή θεάτρων & παραστάσεων
- Κράτηση θέσεων
- Διαχείριση κρατήσεων (προβολή & ακύρωση)