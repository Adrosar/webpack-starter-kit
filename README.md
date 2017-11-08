## Instalacja

1. Zainstaluj **Node.js**. Zalecam wersję: _LTS v6.11.3 (includes npm 3.10.10)_ lub **najnowszą**.
2. Otwórz konsolę _(terminal)_ i przejdź do folderu projektu
3. Zainstaluj menadżer pakietów [YARN](https://yarnpkg.com), poleceniem:

        npm install -g yarn

4. Zainstaluj zależności z pliku **package.json**

        yarn install

5. Gotowe :)


## Zadania

Wszystkie skrypty **ZADAŃ** znajdują się w folderze **bin**.
Polecenie uruchamiające konkretne zadanie należy wykonać w konsoli _(terminalu)_ będąc w katalogu projektu.

- Interaktywny tryb _(czuwaj i buduj)_: `yarn run watch`
- Budowanie aplikacji: `yarn run build`
- Dystrybucja aplikacji: `yarn run distribute`
- Serwer deweloperski: `yarn run server`
- Testowanie aplikacji *(PhantomJS)*: `yarn run test`


Do uruchamiania **ZADAŃ** można użyć alternatywnej składni, która uruchamia bezpośrednio plik `*.js` w środowisku **NodeJS**.

Przykład _(terminal BASH)_:

	node ./bin/build.js


## Struktura projektu

Foldery _(katalogii)_:

- `./assets` - Zasoby aplikacji, które **NIE** podlegają budowaniu _(kompilacji)_.
- `./bin` - Skrypty **ZADAŃ**.
- `./build` - Zbudowana _(skompilowana)_ aplikacja.
- `./dist` - Pliki gotowe do dystrybucjii.
- `./node_modules` - Paczki z **NPM** i **YARN**.
- `./source` - Źródło aplikacji.
- `./test` - Testy jednostkowe.
- `./tools` - Skrypty pomocnincze, np: _serwer deweloperski_.
- `./web` - pliki które **NIE** są używana w budowaniu ani dystrybucji aplikacji, ale są potrzebne podczas tworzenia i testowania.


## Testy jednostkowe

Zaimplementowane testy są oparte o wyjątki: `throw new Error()` wywoływane, gdy testowany fragment kodu się **NIE** powiedzie. 

Aby przetestować aplikację przejdź pod adres: 

	http://127.0.0.1:8080/runTest.html

i otwórz konsolę deweloperską przeglądarki. Najczęściej można to zrobić klawiszem **[F12]**.

Brak wyjątku (błędu) w konsoli oznacza iż testy przechodzą poprawnie :)


### Struktura katalogu `./test`:

- `./test/assets` - Dodatkowe zasoby, np: biblioteka [ChaiJS](http://chaijs.com).
- `./test/spec` - Pliki o końcówce `.spec.js`, zawierające testy _(specyfikację)_.
- `./test/index.html` - Plik, który uruchamia testy. Dostępny pod adresem `http://127.0.0.1:8080/runTest.html`.


### Automatyczne testowanie:

 1. Zainstaluj środowisko [PhantomJS](http://phantomjs.org)
 2. Sprawdź czy w *konsoli/terminalu* działa polecenie `phantomjs -v`
 3. Uruchom serwer deweloperski `yarn run server`
 4. Zbuduj *(skompiluj)* aplikację `yarn run build`
 5. Uruchom testy `yarn run test`