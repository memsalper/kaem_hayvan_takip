/*AÇIKLAMA*/

/*=============================================================================================================================

data-validation-rule => input konrolünün üzerine eklenen bu attribute ile doğrulama yapılması gerektiği anlaşılır.
İçerisinde yer alan sınıf ise doğrulama işleminin neye göre yapılacağının anlaşılmasını sağlar.

===============================================================================================================================*/

/*ÖRNEKLER*/

/*=============================================================================================================================

data-validation-rule="{'required':'true','message':'Lütfen bu alanı boş bırakmayınız!'}"
data-validation-rule="{'range':'true', 'min':'11', 'max':'11', 'message':'Lütfen bu alana 11 karakter giriniz!'}"
data-validation-rule="{'maxvalue':'true','max':'100','message':'Lütfen bu alana 100 ve 100 den küçük bir değer giriniz!'}"


===============================================================================================================================*/

/*KULLANIM*/

/*=============================================================================================================================

var $validationHelper = new ValidationHelper();
$validationHelper.init({
    ContainerId: 'frmUser',//İçerisindeki inputların gezileceği container Id bilgisidir.
    ErrorContainerModel: { 
        ClosestSelector: '.form-group', //Hata olduğunun anlaşılması için kırmızı renkle işaretlenecek olan html elemanına erişmek için kullanılacak selector.
        Class: 'has-error' //Kırmızı renk işini halledecek olan css.
    },
    ErrorMessageModel: { 
        ClosestSelector: '.col-md-9', //Hata mesajının ekleneceği html elemanına erişmek için kullanılacak olan selector.
        Class: 'help-block help-block-error' //Hata mesajının ne şekilde set edileceği bilgisidir.
    },
    Completed: function (result) {
        if (result.HasError) {
            //Hata olduğu anlaşılır...
        };
    }
});

===============================================================================================================================*/

var ValidationHelper = function () {

    var $validationOption = null;

    return {
        validate: function (option) {

            $validationOption = option;

            var $hasError = false;
            var $scopeError = false;

            var $validationConrainerIdArray = [];

            if (Object.prototype.toString.call(option.ContainerId) === '[object Array]') {
                $validationConrainerIdArray = option.ContainerId;
            } else {
                $validationConrainerIdArray.push(option.ContainerId);
            };

            $.each($validationConrainerIdArray, function (i, containerId) {

                $('#' + containerId + ' [data-validation-rule]').not('[disabled]').each(function (i2, input) {

                    var $validationRuleModelArray = [];
                    var $validationRuleModel = null;

                    try {

                        $validationRuleModel = eval('(' + $(input).data('validation-rule') + ')');

                    } catch (e) {
                        return;
                    };

                    if ($validationRuleModel == null) {
                        return;
                    };

                    if (Object.prototype.toString.call($validationRuleModel) === '[object Array]') {
                        $validationRuleModelArray = $validationRuleModel;
                    } else {
                        $validationRuleModelArray.push($validationRuleModel);
                    };

                    $scopeError = false;

                    $.each($validationRuleModelArray, function (i2, validationRuleModel) {

                        var $span = '<span class="' + option.ErrorMessageModel.Class + '" data-errormessage="true">' + validationRuleModel.message + '</span>';

                        switch (input.type) {

                            case "hidden":
                            case "textarea":
                            case "password":
                            case "text":
                                if (validationRuleModel.required != null && Boolean(validationRuleModel.required) == true && $(input).data('type') == "decimal" && Validate.IsNullOrEmpty($(input).val().replace('.', ''))) {
                                    SetError();
                                } else if (validationRuleModel.required != null && Boolean(validationRuleModel.required) == true && Validate.IsNullOrEmpty($(input).val())) {
                                    SetError();
                                } else if (validationRuleModel.range != null && Boolean(validationRuleModel.range) == true && (Validate.IsNullOrEmpty($(input).val()) || $(input).val().toString().length < validationRuleModel.min || $(input).val().toString().length > validationRuleModel.max)) {
                                    SetError();
                                } else if (validationRuleModel.maxvalue != null && Boolean(validationRuleModel.maxvalue) == true && Number($(input).val()) > validationRuleModel.max) {
                                    SetError();
                                } else if (!$scopeError) {
                                    ClearError();
                                };
                                break;

                            case "select-one":
                                if (validationRuleModel.required != null && Boolean(validationRuleModel.required) == true && !Validate.IsGreaterThanZero($(input).val())) {
                                    SetError();
                                } else {
                                    ClearError();
                                };
                                break;

                            default:
                        };

                        function SetError() {
                            if ($(input).closest(option.ErrorMessageModel.ClosestSelector).find('[data-errormessage="true"]').length == 0) {
                                $(input).closest(option.ErrorContainerModel.ClosestSelector).addClass(option.ErrorContainerModel.Class);
                                $(input).closest(option.ErrorMessageModel.ClosestSelector).append($span);
                            };
                            $hasError = true;
                            $scopeError = true;
                        };

                        function ClearError() {
                            $(input).closest(option.ErrorContainerModel.ClosestSelector).removeClass(option.ErrorContainerModel.Class);
                            $(input).closest(option.ErrorMessageModel.ClosestSelector).find('[data-errormessage="true"]').remove();
                        };

                    });
                });

            });

            if (typeof option.Completed == "function") {
                option.Completed({ HasError: $hasError });
            };
        },
        reset: function () {
            if ($validationOption != null) {

                var $validationConrainerIdArray = [];

                if (Object.prototype.toString.call($validationOption.ContainerId) === '[object Array]') {
                    $validationConrainerIdArray = $validationOption.ContainerId;
                } else {
                    $validationConrainerIdArray.push($validationOption.ContainerId);
                };

                $.each($validationConrainerIdArray, function (i, containerId) {
                    $('#' + containerId).find($validationOption.ErrorContainerModel.ClosestSelector).removeClass($validationOption.ErrorContainerModel.Class);
                    $('#' + containerId).find($validationOption.ErrorMessageModel.ClosestSelector).find('[data-errormessage="true"]').remove();
                });

            };
        }
    };
};

var Validate = {
    IsNullOrEmpty: function (val) {

        var value = null;

        if (val != null) {
            value = val.toString().trim().replace(new RegExp(' ', 'g'), '');
        };

        return value == undefined || value == null || value.length == 0 ? true : false;
    },
    IsGreaterThanZero: function (val) {

        var value = Number(val);

        return value > 0 ? true : false;
    },
    IsDate: function (val) {
        var bits = val.split('.');
        var d = new Date(bits[2], bits[1] - 1, bits[0]);
        return d && (d.getMonth() + 1) == bits[1];
    }
};