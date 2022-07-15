#Как запускать фронтенд на докере: пошаговная инструкция

##Первый шаг
В терминале или командной строке прописываем
docker build -t frontendapi .
(Точку не забываем)

##Второй шаг
После компиляции запускаем сам контейнер по образу:
docker run -p 4200:4200 --env API_URL="{ссылка на ваш апи}" frontendapi

В моём случае это
docker run -p 4200:4200 --env API_URL="http://localhost:777/v1/transactions/" frontendapi

Всё!
