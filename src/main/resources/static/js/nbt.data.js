/// <reference path="jquery-3.6.0.min.js" />
/// <reference path="nbt.validation.js" />


var $formPostValidate = null;

//21.07.2014 tdayi => Global geçerli olan data işlemleri
$(document).ready(function () {
    $formPostValidate = new ValidationHelper();
});

//08.04.2014 tdayi => Ajax data islemleri
var Ajax = {
    Post: function (url, data, successEvent, showLoading) {
      
        try {
            showLoading = (typeof showLoading == 'undefined' || showLoading == null) ? true : Boolean(showLoading);
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                cache: false,
                dataType: "json",
                beforeSend: function () {
                    if (showLoading) Metronic.blockUI({ boxed: true });
                },
                success: function (result) {
                    if (result != null && result.Message != null && result.StatusCode != 'RC1000') {
                        if (result.ErrorType == 1) {
                            toastr.warning(result.Message, 'Hata');
                        }
                        else {
                            ShowAlert('Hata', result.Message);
                        }
                        //ShowAlertList(result.Messages);
                        return;
                    };
                    successEvent(result);
                },
                error: function (result) {
                    
                },
                complete: function () {
                    if (showLoading) Metronic.unblockUI();
                }
            });
        } catch (e) {
        };
    },
    JsonPost: function (url, data, successEvent, showLoading) {
        try {
            showLoading = (typeof showLoading == 'undefined' || showLoading == null) ? true : Boolean(showLoading);
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                cache: false,
                dataType: "json",
                beforeSend: function () {
                    if (showLoading) Metronic.blockUI({ boxed: true });
                },
                success: function (result) {
                    if (result != null && result.Message != null && result.StatusCode != 'RC1000') {
                        if (result.ErrorType == 1) {
                            toastr.warning(result.Message, 'Hata');
                        }
                        else {
                            ShowAlert('Hata', result.Message);
                        }
                        return;
                    };
                    successEvent(result);
                },
                error: function (result) {

                },
                complete: function () {
                    if (showLoading) Metronic.unblockUI();
                }
            });
        } catch (e) {
        };
    },
    Get: function (url, data, successEvent, showLoading) {
        try {
            showLoading = (typeof showLoading == 'undefined' || showLoading == null) ? true : Boolean(showLoading);
            $.ajax({
                type: "GET",
                url: url,
                data: data,
                cache: false,
                dataType: "json",
                beforeSend: function () {
                    if (showLoading) Metronic.blockUI({ boxed: true });
                },
                success: function (result) {
                    if (result != null && result.Message != null && result.StatusCode != 'RC1000') {
                        if (result.ErrorType == 1) {
                            toastr.warning(result.Message, 'Hata');
                        }
                        else {
                            ShowAlert('Hata', result.Message);
                        }
                        return;
                    };
                    successEvent(result);
                },
                error: function (result) {

                },
                complete: function () {
                    if (showLoading) Metronic.unblockUI();
                }
            });
        } catch (e) {

        };
    },
    JsonGet: function (url, data, successEvent, showLoading) {
        try {
            showLoading = (typeof showLoading == 'undefined' || showLoading == null) ? true : Boolean(showLoading);
            $.ajax({
                type: "GET",
                url: url,
                data: JSON.stringify(data),
                cache: false,
                contentType: "application/json",
                dataType: "json",
                beforeSend: function () {
                    if (showLoading) Metronic.blockUI({ boxed: true });
                },
                success: function (result) {
                    if (result != null && result.Message != null && result.StatusCode != 'RC1000') {
                        if (result.ErrorType == 1) {
                            toastr.warning(result.Message, 'Hata');
                        }
                        else {
                            ShowAlert('Hata', result.Message);
                        }
                        return;
                    };
                    successEvent(result);
                },
                error: function (result) {

                },
                complete: function () {
                    if (showLoading) Metronic.unblockUI();
                }
            });
        } catch (e) {

        };
    }
};

//08.04.2014 tdayi => Form data islemleri
var Form = {
    GetData: function (formId) {
        var $model = {};
        return Form.GetDataWithModel(formId, $model);
    },
    GetDataWithModel: function (formId, model) {
        var $model = model;
        $("#" + formId + " [name]").each(function (inputIndex, input) {
            var $prop = $(this).attr('name');
            if ($prop != null && $prop != undefined) {
                switch (input.type) {
                    case 'text':
                        if ($(this).val() != "") {
                            if ($(input).hasClass('datetime') || $(input).hasClass('datetime2') || $(input).data('type') == "datetime") {
                                $model[$prop] = Data.DateTimeToJson($(this).val());
                            } else {
                                $model[$prop] = $(this).val();
                            };
                        };
                        break;
                    case 'password':
                        if ($(this).val() != "") {
                            $model[$prop] = $(this).val();
                        };
                        break;
                    case 'select-multiple':
                        if ($(this).val() != "" && $(this).val() != 0) {
                            $model[$prop] = $(this).val();
                        };
                        break;
                    case 'select-one':
                        if ($(this).val() != "" && Number($(this).val()) > 0) {
                            $model[$prop] = $(this).val();
                        };
                        break;
                    case 'textarea':
                        if ($(this).val() != "") {
                            $model[$prop] = $(this).val();
                        };
                        break;
                    case 'checkbox':
                        if ($(this).is(':checked')) {
                            $model[$prop] = true;
                        } else {
                            $model[$prop] = false;
                        };
                        break;
                    case 'radio':
                        if ($(this).is(':checked')) {
                            $model[$prop] = $(this).val();
                        };
                        break;
                    case 'hidden':
                        if ($(this).val() != "") {
                            $model[$prop] = $(this).val();
                        };
                        break;
                };
            };
        });
        return $model;
    },
    SetData: function (formId, data) {
        //Result nesnesinin property bilgilerini toplar.
        var $props = [];
        for (var prop in data) {
            $props.push(prop);
        };
        //Form icerisindeki prop data nesnelerinde dolasir ve result nesnesinin property bilgisi ile eslestigi kontrole veri baglar.
        $("#" + formId + " [name]").each(function (inputIndex, input) {
            $.each($props, function (propIndex, prop) {
                if ($(input).attr('name') == prop) {
                    switch (input.type) {
                        case 'text':
                        case 'password':
                            if (data[prop] != null && data[prop] != "") {
                                if ($(input).hasClass('tags')) {
                                    var $tags = data[prop].toString().split(',');
                                    $.each($tags, function (i, tag) {
                                        $(input).addTag(tag);
                                    });
                                } else if ($(input).hasClass('datetime') || $(input).hasClass('datetime2') || $(input).data('type') == "datetime") {
                                    $(input).datepicker("setDate", Data.DateTimeAutoFormat(data[prop]));
                                } else if ($(input).data('type') == "decimal") {
                                    var $decimalValue = data[prop];
                                    if (!isNaN(Number(data[prop]))) {
                                        $decimalValue = Number(data[prop]).toFixed(2);
                                    };
                                    $(input).val($decimalValue).trigger('input');
                                } else {
                                    $(input).val(data[prop]);
                                };
                            };
                            break;
                        case 'select-multiple':
                            if (data[prop] != null && data[prop].length > 0) {
                                if ($(input).hasClass('select2') || $(input).hasClass('select2me')) {
                                    var $multipleSelect = [];
                                    $.each(data[prop], function (i, item) {
                                        if ($(input).data('itemprop') != null && $(input).data('itemprop') != undefined) {
                                            $multipleSelect.push(item[$(input).data('itemprop')]);
                                        } else {
                                            $multipleSelect.push(item);
                                        };
                                    });
                                    $(input).select2('val', $multipleSelect);
                                } else {
                                    //gerekirse yap.
                                };
                            };
                            break;
                        case 'select-one':
                            if (data[prop] != null && data[prop] != "") {
                                if ($(input).hasClass('select2') || $(input).hasClass('select2me')) {
                                    $(input).select2('val', data[prop]);
                                } else {
                                    $(input).val(data[prop]);
                                };
                            };
                            break;
                        case 'textarea':
                            if (data[prop] != null && data[prop] != "") {
                                $(input).val(data[prop]);
                            };
                            break;
                        case 'checkbox':
                            if (data[prop] != null) {
                                $(input).prop('checked', data[prop]);
                                $(input).val(data[prop]);
                                $.uniform.update(input);
                                $(input).change();
                            };
                            break;
                        case 'radio':
                            if (data[prop] != null) {
                                var $radio = $('input[type="radio"][name="' + prop + '"][value="' + String(data[prop]) + '"]');
                                $radio.prop('checked', true);
                                if ($radio.closest('label').length > 0) {
                                    $radio.closest('.radio-list').find('span').each(function (i2, span) {
                                        $(span).removeClass('checked');
                                    });
                                    $radio.closest('label').parent().click();
                                    if ($radio.data('firstchecked') == null || $radio.data('firstchecked') == undefined) {
                                        $radio.data('firstchecked', "true");
                                        $radio.change();
                                    };
                                    $.uniform.update($radio);
                                };
                            };
                            break;
                        case 'file':
                            break;
                        case 'hidden':
                            if (data[prop] != null && data[prop] != "") {
                                $(input).val(data[prop]);
                            };
                            break;
                    };
                };
            });
        });
    },
    Reset: function (formId) {
        $formPostValidate.reset();
        $('#' + formId + ' :input').not(':button').each(function () {
            switch (this.type) {
                case 'text':
                    if ($(this).hasClass('tags')) {
                        var $tagInput = $(this);
                        var $tags = $(this).val().split(',');
                        if ($tags.length > 0) {
                            $.each($tags, function (i, tag) {
                                $($tagInput).removeTag(tag);
                            });
                        };
                    } else {
                        $(this).val('');
                    };
                    break;
                case 'password':
                    $(this).val('');
                    break;
                case 'select-multiple':
                    if ($(this).hasClass('select2') || $(this).hasClass('select2me')) {
                        $(this).select2('val', '');
                    };
                    $(this).empty();
                    break;
                case 'select-one':
                    if ($(this).hasClass('select2') || $(this).hasClass('select2me')) {
                        $(this).select2('val', '');
                    };
                    $(this).empty();
                    break;
                case 'textarea':
                    $(this).val('');
                    break;
                case 'checkbox':
                    $(this).prop('checked', false);
                    $.uniform.update($(this));
                    break;
                case 'radio':
                    $(this).removeData('firstchecked');
                    if (Boolean($(this).data('default'))) {
                        $(this).prop('checked', true);
                        if ($(this).closest('label').length > 0) {
                            $(this).closest('.radio-list').find('span').each(function () {
                                $(this).removeClass('checked');
                            });
                            $(this).closest('label').parent().click();
                            $(this).change();
                            $.uniform.update($(this));
                        };
                    };
                    break;
                case 'file':
                    $(this).replaceWith($(this).val('').clone(true));
                    break;
                case 'hidden':
                    if ($(this).hasClass('select2') || $(this).hasClass('select2me')) {
                        $(this).select2('val', '');
                    };
                    $(this).val('');
                    break;
            };
        });
        $("#" + formId + " table > tbody").empty();
    },
    Post: function (formId, successEvent, showLoading) {
        try {
            
            Ajax.Post($('#' + formId).attr('action'), $('#' + formId).serialize(), successEvent, showLoading);
        } catch (e) {
        };
    },
    PostWithValidate: function (formId, successEvent, showLoading) {
        try {

            var $hasError = false;

            $formPostValidate.validate({
                ContainerId: formId,
                ErrorContainerModel: {
                    ClosestSelector: '.form-group',
                    Class: 'has-error'
                },
                ErrorMessageModel: {
                    ClosestSelector: '.validation',
                    Class: 'help-block help-block-error'
                },
                Completed: function (result) {
                    $hasError = result.HasError;
                }
            });

            if ($hasError) {
                return false;
            };
            Ajax.Post($('#' + formId).attr('action'), $('#' + formId).serialize(), successEvent, showLoading);

        } catch (e) {
        };
    },
    PostWithUrl: function (formId, url, successEvent, showLoading) {
        try {
            var $hasError = false;

            $formPostValidate.validate({
                ContainerId: formId,
                ErrorContainerModel: {
                    ClosestSelector: '.form-group',
                    Class: 'has-error'
                },
                ErrorMessageModel: {
                    ClosestSelector: '.validation',
                    Class: 'help-block help-block-error'
                },
                Completed: function (result) {
                    $hasError = result.HasError;
                }
            });

            if ($hasError) {
                return false;
            };
            Ajax.Post(url, $('#' + formId).serialize(), successEvent, showLoading);
        } catch (e) {
        };
    },
    FilePost: function (formId, progressId, progressBarId, successEvent) {
        $('#' + formId).ajaxForm({
            beforeSend: function () {
                $('#' + progressBarId).css('width', 0 + '%').attr('aria-valuenow', 0);
                Metronic.blockUI({ boxed: true });
            },
            uploadProgress: function (event, position, total, percentComplete) {
                $('#' + progressBarId).css('width', percentComplete + '%').attr('aria-valuenow', percentComplete);
            },
            beforeSubmit: function (formData, jqForm, options) {
                $('#' + progressId).show();
            },
            success: function (result, statusText) {
                $('#' + progressId).hide();
                $('#' + progressBarId).css('width', 0 + '%').attr('aria-valuenow', 0);
                if (result != null && result.HasError != null && result.HasError == true) {
                    ShowAlertList(result.Messages);
                    return;
                };
                successEvent(result);
            },
            error: function (xhr) {
                $('#' + progressId).hide();
                $('#' + progressBarId).css('width', 0 + '%').attr('aria-valuenow', 0);
            },
            complete: function () {
                Metronic.unblockUI();
            }
        });
    },
};

//10.07.2014  => Veri dönüştürme işlemleri
var Data = {
    JsonToDateTime: function (jsonDate) {
        if (jsonDate == null) return '';
        var dateString = jsonDate.substring(0, 10).split('-');
        
        var date = (dateString[2].length == 1 ? "0" + dateString[2] : dateString[2]) + "." + (dateString[1].length == 1 ? "0" + dateString[1] : dateString[1]) + "." + dateString[0];
        //if (jsonDate == null) return '';
        //var dateString = jsonDate.substr(6);
        //var currentTime = new Date(parseInt(dateString));
        //var month = currentTime.getMonth() + 1;
        //var day = currentTime.getDate();
        //var year = currentTime.getFullYear();
        //var date = (day.toString().length == 1 ? "0" + day : day) + "." + (month.toString().length == 1 ? "0" + month : month) + "." + year;
        return date;
    },
    JsonToDateTime2: function (jsonDate) {
        if (jsonDate == null) return '';
        var dateString = jsonDate.substr(6);
        var currentTime = new Date(parseInt(dateString));
        var month = currentTime.getMonth() + 1;
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        var hour = currentTime.getHours();
        var minute = currentTime.getMinutes();
        var date = (day.toString().length == 1 ? "0" + day : day) + '.' + (month.toString().length == 1 ? "0" + month : month) + "." + year + " " + (hour.toString().length == 1 ? "0" + hour : hour) + ":" + (minute.toString().length == 1 ? "0" + minute : minute);
        return date;
    },
    DateTimeToJson: function (datetime) {
        var $date = datetime.toString().split('.');
        return $date[2] + '-' + $date[1] + '-' + $date[0];
    },
    DateTimeTrFormat: function (datetime) {
        var $date = datetime.split('T')[0].toString().split('-');
        return $date[2] + '.' + $date[1] + '.' + $date[0];
    },
    DateTimeAutoFormat: function (text) {

        if (text == null) {
            return '';
        }
        if (String(text).indexOf('Date') > -1) {
            return Data.JsonToDateTime(text);
        };

        if (String(text).indexOf('-') > -1) {
            return Data.DateTimeTrFormat(text);
        };

        return text;
    }
};

//21.07.2014 tdayi => Input nesnelerinin ortak yürütülecek işlemleri
var Input = {
    SelectLoad: function (option) {
        if (option.data == null) return;
        var $ddlHtml = '';
        $.each(option.data, function (i, item) {
            if (option.additionalData != null && option.additionalData != undefined) {
                $ddlHtml += '<option value="' + item[option.value] + '" data-' + String(option.additionalData).toLowerCase() + '="' + item[option.additionalData] + '">' + item[option.text] + '</option>';
            } else {
                $ddlHtml += '<option value="' + item[option.value] + '">' + item[option.text] + '</option>';
            };
        });
        $('#' + option.Id).empty();
        var $firstOptionText = (option.firstOptionText != null || option.firstOptionText != undefined) ? option.firstOptionText : "";
        if ($firstOptionText != "" && ($('#' + option.Id).hasClass('select2') || $('#' + option.Id).hasClass('select2me'))) {
            $('#' + option.Id).data('placeholder', $firstOptionText);
        };
        if ($firstOptionText != "" && ($('#' + option.Id).hasClass('select2') || $('#' + option.Id).hasClass('select2me'))) {
            $('#' + option.Id).append('<option value="null">' + $firstOptionText + '</option>');
        };
        $('#' + option.Id).append($ddlHtml);
        if (option.selectedValue != null) {
            if ($('#' + option.Id).hasClass('select2') || $('#' + option.Id).hasClass('select2me')) {
                $('#' + option.Id).select2('val', option.selectedValue);
            } else {
                $('#' + option.Id).val(option.selectedValue);
            };
        } else {
            if ($('#' + option.Id).hasClass('select2') || $('#' + option.Id).hasClass('select2me')) {
                $('#' + option.Id).select2('val', "");
            } else {
                $('#' + option.Id).val("");
            };
        };
    },
    SelectUILoad: function (option) {
        if (option.data == null) return;
        var $ddlHtml = '';
        $.each(option.data, function (i, item) {
            $ddlHtml += '<option value="' + item[option.value] + '">' + item[option.text] + '</option>';
        });
        $('#' + option.Id).empty();
        
        $('#' + option.Id).append($ddlHtml);
        if (option.selectedValue != null) {
            $('#' + option.Id).val(option.selectedValue);
            
        } 
    },
    GroupSelectLoad: function (option) {
        if (option.data == null) return;
        var $ddlHtml = '';
        $.each(option.data, function (i, parent) {
            $ddlHtml += '<optgroup label="' + parent[option.parentText] + '">';
            if (parent[option.childData] != null) {
                $.each(parent[option.childData], function (i2, child) {
                    $ddlHtml += '<option value="' + child[option.value] + '">' + child[option.childText] + '</option>';
                });
            };
            $ddlHtml += '</optgroup>';
        });
        $('#' + option.Id).append($ddlHtml);
    }
};

//21.07.2014 tdayi => Replace işlemini tüm string ifadesi içerisinde geçen karakterlerde uygular.
String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find, 'g'), replace);
};

//09.09.2014 tdayi => Uygulama genelinde istemci tarafında guid değeri üretmek için kullanılır.
var Guid = (function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
    }
    return function () {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
               s4() + '-' + s4() + s4() + s4();
    };
})();

//10.10.2014 tdayi => Summernot editör ile ilgili işlemleri yürütür.
function SummernoteHelper() {
    return {
        init: function (option) {
            $('#' + option.SummernoteId).destroy();
            $('#' + option.SummernoteId).summernote({
                height: option.Height,
                maxHeight: option.Height,
                codemirror: {
                    mode: 'text/html',
                    htmlMode: true,
                    lineNumbers: true,
                    theme: 'monokai'
                },
                oninit: function () {
                    var $progessHtml = '<div style="width:100%; height:10px; clear:both;"></div>' +
                                       '<div id="divSummernoteProgress" style="display: none;">' +
                                       '<div class="progress progress-striped active">' +
                                       '<div id="divSummernoteProgressBar" class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">' +
                                       '<span id="spnSummernoteProgressPercent"></span>' +
                                       '</div>' +
                                       '</div>' +
                                       '</div>';

                    $('.note-toolbar').append($progessHtml);
                },
                onkeyup: function (e) {
                    $('#' + option.HiddenFieldId).val($('#' + option.SummernoteId).code());
                },
                onChange: function (e) {
                    $('#' + option.HiddenFieldId).val($('#' + option.SummernoteId).code());
                },
                onImageUpload: function (files, editor, $editable) {
                    var formData = new FormData();
                    formData.append(Guid(), files[0]);
                    formData.append('fileType', option.FileType);
                    $.ajax({
                        url: "/Common/SetTempFile",
                        data: formData,
                        type: 'POST',
                        cache: false,
                        contentType: false,
                        processData: false,
                        xhr: function () {
                            myXhr = $.ajaxSettings.xhr();
                            if (myXhr.upload) {
                                myXhr.upload.addEventListener('progress', progressHandlingFunction, false);
                            };
                            return myXhr;
                        },
                        beforeSend: function () {
                            setSummernoteProgressStatus(0);
                            $('#divSummernoteProgress').show();
                        },
                        complete: function () {
                            $('#divSummernoteProgress').hide();
                        },
                        success: function (result) {
                            setSummernoteProgressStatus(0);
                            $('#divSummernoteProgress').hide();
                            if (result == null || result.Path == null || result.Path == "") {
                                ShowAlert('Hata', 'Dosya yüklenemedi!');
                                return;
                            };
                            editor.insertImage($editable, result.Path);
                        },
                        error: function () {
                            ShowAlert('Hata', 'Dosya yükleme de hata oluştu: ' + xhr.ResponseText);
                            $('#divSummernoteProgress').hide();
                            editor.insertImage($editable, result.Path);
                        }
                    });
                }
            });
            function progressHandlingFunction(e) {
                if (e.lengthComputable) {
                    var percentVal = parseInt((e.loaded / e.total) * 4000);
                    setSummernoteProgressStatus(percentVal);
                };
            };
            function setSummernoteProgressStatus(percentVal) {
                $('#spnSummernoteProgressPercent').text('' + percentVal + '% Tamamlandı');
                $('#divSummernoteProgressBar').css('width', percentVal + '%');
                $('#divSummernoteProgressBar').attr('aria-valuenow', percentVal);
            };
        }
    };
};

function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

//29.03.2015 tdayi => Select2 ile ilgili işlemleri yürütür.
function Select2Helper() {
    return {
        init: function (option) {
            var $takeCount = option.TakeCount == null || option.TakeCount == undefined ? 10 : option.TakeCount;
            var $key = option.Key == null || option.Key == undefined ? 'Id' : option.Key;
            var $queryColumn = option.QueryColumn;
            var $tableName = option.TableName;
            var $orderColumn = option.OrderColumn == null || option.OrderColumn == undefined ? $queryColumn : option.OrderColumn;
            var $minimumInputLength = option.MinimumInputLength == null || option.MinimumInputLength == undefined ? 3 : option.MinimumInputLength;

            $('#' + option.Id).select2({
                cacheDataSource: [],
                placeholder: option.PlaceHolder,
                minimumInputLength: $minimumInputLength,
                allowClear: true,
                multiple: option.Multiple,
                id: function (e) { return e[$key]; },
                initSelection: function (element, callback) {
                    if (option.InitData != null && option.InitData != undefined) {
                        callback(option.InitData);
                    };
                },
                query: function (query) {

                    self = this;
                    var key = query.term;
                    var cachedData = self.cacheDataSource[key];

                    if (cachedData) {
                        query.callback({ results: cachedData });
                        return;
                    } else {
                        var $skipCount = ((query.page - 1) * option.TakeCount);
                        var $request = {
                            SkipCount: $skipCount,
                            TableName: $tableName,
                            TakeCount: $takeCount,
                            OrderBy: 'asc',
                            OrderColumn: $orderColumn,
                            FilterParameter: []
                        };

                        if (option.IsPassParamQueryColumn != undefined && option.IsPassParamQueryColumn != null && option.IsPassParamQueryColumn == true) {
                            $request[$queryColumn] = query.term;
                        } else {
                            $request.FilterParameter.push({
                                Operator: 'Contains',
                                PropertyName: $queryColumn,
                                Value: query.term
                            });
                        };

                        if (typeof option.DataInterceptor == 'function') {
                            option.DataInterceptor($request);
                        };
                        Ajax.JsonPost(option.Url, $request, function (results) {
                            self.cacheDataSource[key] = results;
                            query.callback({
                                results: results
                            });
                        });
                    };
                },
                formatResult: option.FormatResult,
                formatSelection: option.FormatSelection,
                escapeMarkup: function (m) { return m; }
            }).on("change", function () {
                if (typeof option.Change == 'function') {
                    option.Change($(this));
                };
            });

            if (option.InitData != null && option.InitData != undefined) {
                var $select2Data = [];
                if (Object.prototype.toString.call(option.InitData) === '[object Array]') {
                    $.each(option.InitData, function (i, item) {
                        $select2Data.push(item[$key]);
                    });
                } else {
                    $select2Data.push(option.InitData[$key]);
                };
                $('#' + option.Id).select2('val', $select2Data);
            };
        }
    };
};

//17.10.2014 tdayi => Dosya adını getirir.
function GetFileExtensions(path) {
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(path)[1];
    return ext;
};

//20.07.2015 tdayi => ajax ile sayfa yükleme işlemi yapar.
function ChangePage(url, pageTitle, pageDescription) {

    Metronic.scrollTop();

    var pageContent = $('.page-content');
    var pageContentBody = $('#divPageContent');

    pageContentBody.empty();

    if (Metronic.getViewPort().width < 992 && $('.page-sidebar').hasClass("in")) {
        $('.page-header .responsive-toggler').click();
    };
    var $breadcrumb = '<li data-dynamic="true">' +
                      '<i class="fa fa-home"></i>' +
                      '<a href="/home">DSIS</a>' +
                      '<i class="fa fa-angle-right"></i>' +
                      '<li data-dynamic="true"><a href="javascript:;">' + pageTitle + '</a>' +
                      '</li>';

    $('#ulBreadcrumb').find('li[data-dynamic="true"]').remove();
    $('#ulBreadcrumb').append($breadcrumb);
    $('#divPageTitle').empty().append('<h3 class="page-title">' + pageTitle + '<small> ' + pageDescription + '</small></h3>');

    Metronic.blockUI({ boxed: true });

    var the = $(this);

    $.ajax({
        type: "GET",
        cache: false,
        url: url,
        dataType: "html",
        success: function (res) {

            if (the.parents('li.open').size() === 0) {
                $('.page-sidebar-menu > li.open > a').click();
            }

            Metronic.unblockUI();
            pageContentBody.html(res);
            Layout.fixContentHeight();
            Metronic.initAjax();
            GlobalPageLoad();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            Metronic.unblockUI();
            pageContentBody.html('<h4>İstekte bulunduğunuz sayfa yüklenemedi!</h4>');
        }
    });
};

//12.08.2016 tdayi => Index değeri bozulan input name bilgileri için tablo içerisinde dolaşıp yeniden index set eder.
function RenumberIndexForTableInputNameAttribute(tbodyName, inputTagName, addedIndexValue) {
    $('#' + tbodyName + ' > tr').each(function (i, item) {

        var indexValue = i;
        if (addedIndexValue != null && addedIndexValue != undefined) {
            indexValue = (i + addedIndexValue);
        };

        var renamePrefix = inputTagName + "[" + indexValue + "]";
        var searchPrefix = /\[\d+\]/;

        $(this).find("input").each(function () {

            var inputName = this.name;
            if (this.name.split('.').length > 1 && this.name.indexOf(inputTagName) > -1) {
                inputName = inputName.substring(this.name.indexOf(inputTagName));
            };

            var index = inputName.match(searchPrefix, renamePrefix);
            if (index != null && index.length > 0) {
                var replacePrefix = inputTagName + index[0];
                this.name = this.name.replace(replacePrefix, renamePrefix);
            };
        });
    });
}
