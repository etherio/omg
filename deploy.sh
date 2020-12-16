#!/bin/sh
DOCS="$(pwd)/docs"
DIST="$(pwd)/dist"
CNAME="${DOCS}/CNAME"

cp "${CNAME}" "${DIST}/$(basename "${CNAME}")"
rm -r "${DOCS}"
mv "${DIST}" "$(basename "${DOCS}")"
