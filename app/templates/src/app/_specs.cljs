(ns <%= service %>.specs
  (:require [cljs.spec :as spec]
            [shared.specs.action :as action :refer [action-spec]]))

;; (spec/def :offcourse/query (spec/or :artifacts :aws/build-artifacts))

;; (spec/def :offcourse/payload (spec/or :pipeline-job :aws/code-pipeline-job
;;                                       :file-path ::file-path
;;                                       :files (spec/coll-of ::file)))

;; (defmethod action-spec :put [_]
;;   (spec/tuple :offcourse/actions :offcourse/payload))
