**Vera Kippel veki2400**

Projektuppgift för Fullstack-utvecklin med ramverk  
Detta är frontend-delen av projektet.  

Projektet använder Vue som frontend-ramverk och Boostrap som CSS-ramverk.  

Komponenter som har skapats:
- Header.vue : Header för inloggade användare
- HeadersFirst.vue : Header för icke inloggade
- ItemSection.vue : Skriver ut specifika varor i egna rader inuti en tabell

I assets-mapp finns bilder som används i applikationen som inte är dynamiskt.  

I utils har det skapats en authToken.js som gör ett POST-anrop som kollar om token finns och om den är giltig.  

Views som har skapats:
- AddView.vue : Vy för att lägga till en ny produkt
- EditView.vue : Vy för att redigera en existerande produkt
- HomeView.vue : Startsida för inloggade som visar en dynamisk h1-rubrik för den specifika användaren. Visar även text och bilder.
- ItemsView.vue : Vy som visar alla existerande produkter i en tabell. Det finns även en sökfunktion över tabellen.
- LoginView.vue : Vy för att logga in en existerande användare
- RegisterView.vue : Vy som registrerar ett nytt konto för en användare
- NotFoundView.vue : Vi som fångar upp alla ändelser/vyer som inte hittas