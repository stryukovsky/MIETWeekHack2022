FROM python:3.10-alpine
ENV PYTHONUNBUFFERED 1
WORKDIR /app
ADD . /app

EXPOSE 8000

RUN apk add bash icu-libs krb5-libs libgcc libintl libssl1.1 libstdc++ zlib dos2unix
RUN apk add libgdiplus --repository https://dl-3.alpinelinux.org/alpine/edge/testing/
RUN chmod 700 ./dotnet-install.sh
RUN dos2unix ./dotnet-install.sh
RUN ./dotnet-install.sh --runtime dotnet --version 6.0.0
ENV PATH="${PATH}:/root/.dotnet"
RUN pip install -r requirements.txt

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]