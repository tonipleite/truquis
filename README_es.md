# truquis

## Qué es esto

En este repositorio se agrupan una serie de scripts, snippets y códigos sueltos que pueden ser útiles para diferentes tareas.

En su conjunto los archivos no componen un proyecto de ningún tipo; en todo caso alguno de ellos puede suponer el desarrollo de algo más grande, pero no tener mayor trascendencia.


## Cosas que te puedes encontrar

1. **plantillaDescargaGoogle.js** es una plantilla en JS que, con pocos cambios estructurales permite descargar información de una serie de URLs de un mismo dominio de manera iterativa.


## Detalle

### 1. plantillaDescargaGoogle.js

Esta plantilla en JS ha sido originalmente diseñada para descargar de manera iterativa información de la página de Google Maps, haciendo peticiones de ruta (cómo ir de "A" a "B") a través de la URL. Es cierto que esta tarea puede hacerse de diferentes maneras, comenzando por utilizar la propia API de Google, o _curl_, para recoger la información.

Sin embargo, para un usuario poco experimentado pero con ciertas nociones de programación, utilizar una API o manejar _curl_ puede resultar complicado y tedioso frente a utilizar esta estructura y adaptarla al problema concreto.

Lo que el script hace de manera iterativa es:
- Abrir una página del mismo dominio que el de la página en el que se está ejecutando el script.
- Esperar un tiempo X determinado.
- Leer la información que se necesite del DOM (_Document Object Model).
- Cerrar la página.

El script cuenta con un rudimentario sistema para evitar el error de lectura que se puede producir en caso de que al navegador no le haya dado tiempo a cargar la página por un error de transferencia de datos. 

Además de esto, existen una serie de parámetros que permiten al usuario establecer los incrementos de tiempo para auto-ajustar las esperas; el programa aumenta o disminuye el tiempo de espera en función del éxito que tiene de lecturas. Así, si trata de leer más rápido de lo que la conexión permite, se aumentará la espera de lectura.