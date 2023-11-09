class BaseDTO {
    validate(props) {
        const optionalFields = ["image"]; // 옵셔널 필드 지정

        if (!props) throw new Error("Body 내용이 비어있습니다.");
        if (typeof props !== "object") throw new Error("Body 타입이 올바르지 않습니다.");

        for (const key in props) {
            // 옵셔널 필드에 대한 처리: 값이 undefined이거나 빈 문자열인 경우, 넘어갑니다.
            // null은 유효한 값으로 처리합니다.
            if (optionalFields.includes(key) && (props[key] === undefined || props[key] === "")) {
                continue;
            }

            // 필수 필드에 대한 처리: 값이 undefined인 경우 에러를 던집니다.
            // 이 조건은 null을 허용합니다.
            if (props[key] === undefined) {
                throw new Error(`${key} 속성이 비어비어있습니다.`);
            }
        }
    }

    toDate(d) {
        const date = new Date(d);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${year}-${month}-${day}`;
    }
}

module.exports = BaseDTO;
