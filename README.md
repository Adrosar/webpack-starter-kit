## Instalacja

1. Zainstaluj **Node.js**. Zalecam wersję: _LTS v6.11.3 (includes npm 3.10.10)_
2. Otwórz konsolę _(terminal)_ i przejdź do folderu projektu
3. Zainstaluj menadżer pakietów [YARN](https://yarnpkg.com), poleceniem:

        npm install -g yarn

4. Zainstaluj zależności z pliku **package.json**

        yarn install

5. Gotowe :)


## Zadania

Wszystkie skrypty **ZADAŃ** znajdują się w folderze **bin**.
Polecenie uruchamiające konkretne zadanie nalezy wykonać w konsoli _(terminalu)_ będąc w katalogu projektu.

- Interaktywny tryb _(czuwaj i buduj)_: `yarn run watch`
- Budowanie aplikacji: `yarn run build`
- Dystrybucja aplikacji: `yarn run distribute`
- Serwer deweloperski: `yarn run server`


## Struktura projektu

Foldery _(katalogii)_:

- `./assets` - Zasoby aplikacji, które **NIE** podlegają budowaniu _(kompilacji)_.
- `./bin` - Skrypty **ZADAŃ**.
- `./build` - Zbudowana _(skompilowana)_ aplikacja.
- `./dist` - Pliki gotowe do dystrybucjii.
- `./node_modules` - Paczki z **NPM** i **YARN**.
- `./source` - Źródło aplikacji.
- `./tools` - Skrypty pomocnincze, np: _serwer deweloperski_.
- `./web` - pliki które **NIE** są używana w budowaniu ani dystrybucji aplikacji, ale są potrzebne podczas tworzenia i testowania.


## Serwer deweloperski:

...