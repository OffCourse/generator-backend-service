(ns <%= service %>.core
  (:require [backend-shared.service.index :as service])
  (:require-macros [cljs.core.async.macros :refer [go]]))

(def adapters {})

(defn ^:export handler [& args]
  (go
    (let [{:keys [event] :as service} (apply service/create adapters args)]
      (service/done service event))))

(defn -main [] identity)
(set! *main-cli-fn* -main)
