
## Instalacja

1. Zainstaluj **Node.js**. Zalecam wersję z serii LTS **8.x.x** (npm **5.x.x**).
2. Otwórz konsolę _(terminal)_ i przejdź do folderu projektu
3. Zainstaluj menadżer pakietów [YARN](https://yarnpkg.com), poleceniem:

        npm install -g yarn

4. Zainstaluj zależności z pliku **package.json**

        yarn install

5. Gotowe :)


## Zadania

Wszystkie skrypty **ZADAŃ** znajdują się w folderze **bin**.

- `build.js` - Budowanie aplikacji do katalogu **build**.
- `copy.js` - Kopiowanie plików z katalogów **build** i **assets** do katalogu **dist**.
- `clear.js` - Czyszczenie katalogów  **build** i **dist** z zawartości.
- `distribute.js` - Wykonanie po kolei skryptów `clear.js`, `build.js`, `minimize.js` i `copy.js`.
- `minimize.js` - Budowanie zminimalizowanej aplikacji do katalogu **build**. Wygenerowane pliki będą miały nazwę w postaci `[name].min.[ext]`.
- `server.js` - Serwer deweloperski.
- `test.js` - Testowanie aplikacji w środowisku **PhantomJS**.
- `watch.js` - Tryb interaktywny _(czuwaj i buduj)_.

Polecenie uruchamiające konkretne zadanie należy wykonać w konsoli _(terminalu)_ będąc w katalogu projektu. Do uruchamiania **ZADAŃ** można użyć jednej z poniższych składni:

Przykład _(terminal BASH)_:

	node ./bin/build.js

lub:

	yarn run build

lub:

	npm run build


## Struktura projektu

Foldery _(katalogii)_:

- `./assets` - Zasoby aplikacji, które **NIE** podlegają budowaniu _(kompilacji)_. Zawartość folderu **assets** jest kopiowana do folderu `./dist` podczas dystrybucji aplikacji.
- `./bin` - Skrypty **ZADAŃ**.
- `./build` - Zbudowana _(skompilowana)_ aplikacja.
- `./dist` - Pliki gotowe do dystrybucjii (np: skopiowania na serwer FTP).
- `./lib` - Skrypty pomocnicze, np: _serwer deweloperski_.
- `./node_modules` - Paczki z **NPM** i **YARN**.
- `./source` - Źródło aplikacji.
- `./test` - Testy jednostkowe.
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
- `./test/runTest.html` - Plik, który uruchamia testy. Dostępny pod adresem `http://127.0.0.1:8080/runTest.html`.


### Automatyczne testowanie:

 1. Zainstaluj środowisko [PhantomJS](http://phantomjs.org)
 2. Sprawdź czy w *konsoli/terminalu* działa polecenie `phantomjs -v`
 3. Uruchom serwer deweloperski `yarn run server`
 4. Zbuduj *(skompiluj)* aplikację `yarn run build`
 5. Uruchom testy `yarn run test`
