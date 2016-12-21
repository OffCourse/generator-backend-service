(ns <%= service %>.mappings
  (:require [backend-shared.service.index :refer [perform fetch]])
  (:require-macros [cljs.core.async.macros :refer [go]]))
